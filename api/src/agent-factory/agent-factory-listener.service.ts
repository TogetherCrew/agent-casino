import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

import { AGENT_FACTORY_CONTRACT } from '../shared/constants/chain.constants'
import { SupportedChainId } from '../shared/types/chain.type'
import { ViemUtilsService } from '../utils/viem.utils.service'

@Injectable()
export class AgentFactoryListenerService
    implements OnModuleInit, OnModuleDestroy
{
    private unwatchAgentCreated?: () => void

    constructor(
        private readonly viemUtilsService: ViemUtilsService,
        @InjectPinoLogger(AgentFactoryListenerService.name)
        private readonly logger: PinoLogger
    ) {}

    onModuleInit() {
        const chainId: SupportedChainId = 84532
        const publicClient = this.viemUtilsService.getPublicClient(chainId)

        this.unwatchAgentCreated = publicClient.watchContractEvent({
            address: AGENT_FACTORY_CONTRACT[chainId].address as `0x${string}`,
            abi: AGENT_FACTORY_CONTRACT[chainId].abi,
            eventName: 'AgentCreated',

            onLogs: (logs) => {
                logs.forEach((log) => {
                    this.logger.info(
                        {
                            agentId: log.args.agentId.toString(),
                            owner: log.args.owner,
                            agentWallet: log.args.agentWallet,
                            name: log.args.name,
                            bio: log.args.bio,
                            character: log.args.character,
                        },
                        'AgentCreated event received'
                    )
                })
            },

            onError: (error) => {
                this.logger.error(
                    { error },
                    'Error watching AgentCreated events'
                )
            },
        })
    }

    onModuleDestroy() {
        if (this.unwatchAgentCreated) {
            this.unwatchAgentCreated()
            this.logger.info('Stopped watching AgentCreated events')
        }
    }
}
