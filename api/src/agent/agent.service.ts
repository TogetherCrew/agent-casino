import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { formatUnits, recoverTypedDataAddress } from 'viem';

import { Coinbase } from '@coinbase/coinbase-sdk';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CdpService } from '../cdp/cdp.service';
import { AGENT_FACTORY_CONTRACT, AGENT_WALLET_CONTRACT } from '../shared/constants/chain.constants';
import { SupportedChainId } from '../shared/types/chain.type';
import { ViemUtilsService } from '../utils/viem.utils.service';

interface WithdrawArgs {
    chainId: SupportedChainId
    message: any
    signature: `0x${string}`
}

@Injectable()
export class AgentService {
    constructor(
        private readonly viemUtilsService: ViemUtilsService,
        @InjectPinoLogger(AgentService.name)
        private readonly logger: PinoLogger,
        private readonly cdpService: CdpService
    ) {}

    public async getFundingWallet(chainId: SupportedChainId, agentId: number) {
        const walletAddress = await this.getAgentWalletAddress(chainId, agentId)
        const walletId = await this.getAgentWalletId(chainId, walletAddress)
        const wallet = await this.cdpService.getWallet(walletId)
        const defualtAddress = await wallet.getDefaultAddress()
        return defualtAddress.getId()
    }

    public async withdrawFunds({
        chainId,
        message,
        signature,
    }: WithdrawArgs): Promise<string> {
        const typedData = message

        const recoveredAddress = await this.recoverSigner(typedData, signature)

        await this.verifySignature(
            chainId,
            recoveredAddress,
            typedData,
            signature
        )

        this.checkSignatureExpiration(typedData)

        const agentId = BigInt(typedData.message.agentId)
        const publicClient = this.viemUtilsService.getPublicClient(chainId)
        const agentFactoryConfig = AGENT_FACTORY_CONTRACT[chainId]

        const agentOwner = await publicClient.readContract({
            address: agentFactoryConfig.address as `0x${string}`,
            abi: agentFactoryConfig.abi,
            functionName: 'ownerOf',
            args: [agentId],
        })

        if (agentOwner.toLowerCase() !== recoveredAddress.toLowerCase()) {
            throw new BadRequestException(
                'Signer is not the owner of the agent'
            )
        }

        const walletAddress = await this.getAgentWalletAddress(
            chainId,
            typedData.message.agentId
        )
        const walletId = await this.getAgentWalletId(chainId, walletAddress)
        const wallet = await this.cdpService.getWallet(walletId)
        const defualtAddress = await wallet.getDefaultAddress()

        const balance = await defualtAddress.getBalance(Coinbase.assets.Eth)
        const requestAmountEther = parseFloat(
            formatUnits(BigInt(typedData.message.amount), 18)
        )
        if (requestAmountEther > Number(balance)) {
            throw new BadRequestException(
                'Request amount is less than current balance'
            )
        }

        const tnx = await this.cdpService.createTransfer(
            wallet,
            recoveredAddress
        )
        return tnx.getTransactionHash()
    }
    private async recoverSigner(
        typedData: any,
        signature: `0x${string}`
    ): Promise<`0x${string}`> {
        try {
            return await recoverTypedDataAddress({
                domain: typedData.domain,
                types: typedData.types,
                primaryType: typedData.primaryType,
                message: typedData.message,
                signature,
            })
        } catch (err) {
            throw new BadRequestException(`Could not recover address: ${err}`)
        }
    }

    private async verifySignature(
        chainId: SupportedChainId,
        recoveredAddress: `0x${string}`,
        typedData: any,
        signature: `0x${string}`
    ) {
        const publicClient = this.viemUtilsService.getPublicClient(chainId)
        const isValid = await publicClient.verifyTypedData({
            address: recoveredAddress,
            domain: typedData.domain,
            types: typedData.types,
            primaryType: typedData.primaryType,
            message: typedData.message,
            signature,
        })

        if (!isValid) {
            throw new BadRequestException('Invalid EIP-712 signature')
        }
    }

    private checkSignatureExpiration(typedData: any): void {
        const nowSec = Math.floor(Date.now() / 1000)
        const expireAt = BigInt(typedData.message.expireAt ?? 0)
        if (expireAt < BigInt(nowSec)) {
            throw new BadRequestException('Signature is expired')
        }
    }

    private async getAgentWalletAddress(
        chainId: SupportedChainId,
        agentId: number
    ): Promise<`0x${string}`> {
        const publicClient = this.viemUtilsService.getPublicClient(chainId)
        const factoryConfig = AGENT_FACTORY_CONTRACT[chainId]
        const agentFactoryAddress = factoryConfig.address as `0x${string}`
        const agentFactoryAbi = factoryConfig.abi

        const agentWalletAddress = await publicClient.readContract({
            address: agentFactoryAddress,
            abi: agentFactoryAbi,
            functionName: 'agentWallets',
            args: [BigInt(agentId)],
        })

        if (
            !agentWalletAddress ||
            agentWalletAddress === '0x0000000000000000000000000000000000000000'
        ) {
            throw new NotFoundException("Didn't find the agent")
        }

        return agentWalletAddress as `0x${string}`
    }

    private async getAgentWalletId(
        chainId: SupportedChainId,
        walletAddress: `0x${string}`
    ): Promise<string> {
        const publicClient = this.viemUtilsService.getPublicClient(chainId)
        const walletConfig = AGENT_WALLET_CONTRACT[chainId]
        const agentWalletAbi = walletConfig.abi

        const walletId = await publicClient.readContract({
            address: walletAddress,
            abi: agentWalletAbi,
            functionName: 'walletId',
        })

        if (!walletId || walletId === '') {
            throw new BadRequestException('Agent has no associated wallet id')
        }

        return walletId
    }

    public async updateAgentWalletId(
        chainId: SupportedChainId,
        agentId: number,
        newWalletId: string
    ): Promise<string> {
        const walletClient = this.viemUtilsService.getWalletClient(chainId)

        const factoryConfig = AGENT_FACTORY_CONTRACT[chainId]

        try {
            const txHash = await walletClient.writeContract({
                address: factoryConfig.address as `0x${string}`,
                abi: factoryConfig.abi,
                functionName: 'updateWalletId',
                args: [BigInt(agentId), newWalletId],
            })
            return txHash
        } catch (error) {
            console.log(error)
            this.logger.error(
                { error },
                'Failed to update agent walletId on chain'
            )
            throw error
        }
    }
}
