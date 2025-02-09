import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import {
    Client,
    createPublicClient,
    createWalletClient,
    http,
    webSocket,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as chains from 'viem/chains'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { CHAINS, SUPPORTED_CHAINS } from '../shared/constants/chain.constants'
import { SupportedChainId } from '../shared/types/chain.type'

@Injectable()
export class ViemUtilsService {
    private publicClients: Map<number, any>
    private walletClients: Map<number, any>
    private readonly privateKey: '0x${string}'

    constructor(
        private readonly configService: ConfigService,
        @InjectPinoLogger(ViemUtilsService.name)
        private readonly logger: PinoLogger
    ) {
        this.publicClients = new Map<number, Client<any, any, any>>()
        this.walletClients = new Map<number, Client<any, any, any>>()
        this.privateKey = this.configService.get<string>(
            'app.privateKey'
        ) as '0x${string}'

        this.setPublicClients()
        this.setWalletClients()
    }

    /**
     * Initialize public clients for all supported chains.
     */
    private setPublicClients() {
        for (const chainId of SUPPORTED_CHAINS) {
            const chain = this.idToChain(chainId)
            if (chain) {
                const rpcURL = CHAINS[chainId].HTTPRpcURL

                const client = createPublicClient({
                    chain,
                    transport: http(rpcURL),
                })
                this.publicClients.set(chainId, client)
            }
        }
    }

    private setWalletClients() {
        const account = privateKeyToAccount(this.privateKey)

        for (const chainId of SUPPORTED_CHAINS) {
            const chain = this.idToChain(chainId)
            if (chain) {
                const rpcURL = CHAINS[chainId].HTTPRpcURL

                const walletClient = createWalletClient({
                    chain,
                    account,
                    transport: http(rpcURL),
                })
                this.walletClients.set(chainId, walletClient)
            }
        }
    }

    public createWsPublicClient(chainId: SupportedChainId) {
        const chain = this.idToChain(chainId)
        const rpcURL = CHAINS[chainId].WsRpcURL

        return createPublicClient({
            chain,
            transport: webSocket(rpcURL),
        })
    }

    getPublicClient(chainId: SupportedChainId) {
        return this.publicClients.get(chainId)
    }

    getWalletClient(chainId: SupportedChainId) {
        return this.walletClients.get(chainId)
    }

    idToChain(chainId: SupportedChainId): chains.Chain | undefined {
        for (const chain of Object.values(chains)) {
            if ('id' in chain && chain.id === chainId) {
                return chain
            }
        }
        return undefined
    }
}
