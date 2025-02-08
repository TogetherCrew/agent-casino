import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'

import {
    AGENT_FACTORY_CONTRACT,
    AGENT_WALLET_CONTRACT,
} from '../shared/constants/chain.constants'
import { SupportedChainId } from '../shared/types/chain.type'
import { ViemUtilsService } from '../utils/viem.utils.service'

@Injectable()
export class MpcWalletService {
    constructor(
        private readonly viemUtilsService: ViemUtilsService,
        @InjectPinoLogger(MpcWalletService.name)
        private readonly logger: PinoLogger
    ) {}

    public async getFundingWallet(
        chainId: SupportedChainId,
        agentId: number
    ): Promise<string> {
        const walletAddress = await this.getAgentWalletAddress(chainId, agentId)
        const walletId = await this.getAgentWalletId(chainId, walletAddress)
        return walletId
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
}
