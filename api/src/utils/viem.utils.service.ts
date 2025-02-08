import { Client, createPublicClient, http } from 'viem'
import * as chains from 'viem/chains'

import { Injectable } from '@nestjs/common'

import { SUPPORTED_CHAINS } from '../shared/constants/chain.constants'
import { SupportedChainId } from '../shared/types/chain.type'

@Injectable()
export class ViemUtilsService {
    private publicClients: Map<number, any>

    constructor() {
        this.publicClients = new Map<number, Client<any, any, any>>()
        this.setPublicClients()
    }

    private setPublicClients() {
        for (const chainId of SUPPORTED_CHAINS) {
            const chain = this.idToChain(chainId)
            if (chain) {
                const client = createPublicClient({
                    chain,
                    transport: http(),
                })
                this.publicClients.set(chainId, client)
            }
        }
    }

    getPublicClient(chainId: SupportedChainId) {
        return this.publicClients.get(chainId)
    }

    idToChain(chainId: SupportedChainId): chains.Chain {
        for (const chain of Object.values(chains)) {
            if ('id' in chain) {
                if (chain.id === chainId) {
                    return chain
                }
            }
        }
    }
}
