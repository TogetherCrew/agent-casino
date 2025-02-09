import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

// import your CDP service
import { CdpService } from '../cdp/cdp.service' // adjust path if necessary
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
        private readonly logger: PinoLogger,
        private readonly cdpService: CdpService // <-- inject CdpService here
    ) {}

    onModuleInit() {
        const chainId: SupportedChainId = 84532
        const publicClient = this.viemUtilsService.getPublicClient(chainId)

        this.unwatchAgentCreated = publicClient.watchContractEvent({
            address: AGENT_FACTORY_CONTRACT[chainId].address as `0x${string}`,
            abi: AGENT_FACTORY_CONTRACT[chainId].abi,
            eventName: 'AgentCreated',

            onLogs: async (logs) => {
                for (const log of logs) {
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

                    try {
                        // Simply create the MPC wallet
                        const wallet = await this.cdpService.createMpcWallet()
                        this.logger.info(
                            { wallet },
                            'Successfully created MPC wallet for new Agent'
                        )
                    } catch (error) {
                        this.logger.error(
                            { error },
                            'Error while creating MPC wallet for AgentCreated event'
                        )
                    }
                }
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
