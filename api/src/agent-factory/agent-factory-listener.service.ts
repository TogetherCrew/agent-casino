import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { AgentService } from '../agent/agent.service';
import { CdpService } from '../cdp/cdp.service';
import { AGENT_FACTORY_CONTRACT } from '../shared/constants/chain.constants';
import { SupportedChainId } from '../shared/types/chain.type';
import { ViemUtilsService } from '../utils/viem.utils.service';

@Injectable()
export class AgentFactoryListenerService
    implements OnModuleInit, OnModuleDestroy
{
    private unwatchAgentCreated?: () => void

    constructor(
        private readonly viemUtilsService: ViemUtilsService,
        @InjectPinoLogger(AgentFactoryListenerService.name)
        private readonly logger: PinoLogger,
        private readonly cdpService: CdpService,
        private readonly agentService: AgentService
    ) {}

    onModuleInit() {
        const chainId: SupportedChainId = 8453

        const publicClient = this.viemUtilsService.createWsPublicClient(chainId)

        this.unwatchAgentCreated = publicClient.watchContractEvent({
            address: AGENT_FACTORY_CONTRACT[chainId].address as `0x${string}`,
            abi: AGENT_FACTORY_CONTRACT[chainId].abi,
            eventName: 'AgentCreated',

            onLogs: async (logs) => {
                for (const log of logs) {
                    const agentId = Number(log.args.agentId)
                    const owner = log.args.owner
                    const agentWallet = log.args.agentWallet
                    const name = log.args.name
                    const bio = log.args.bio
                    const character = log.args.character

                    this.logger.info(
                        { agentId, owner, agentWallet, name, bio, character },
                        'AgentCreated event received'
                    )

                    try {
                        const wallet = await this.cdpService.createWallet()
                        const walletId = wallet.getId()
                        this.logger.info(
                            { walletId },
                            'Successfully created MPC wallet for new Agent'
                        )

                        await this.agentService.updateAgentWalletId(
                            chainId,
                            agentId,
                            walletId
                        )
                        this.logger.info(
                            { agentId, walletId },
                            'Successfully updated agent wallet ID on chain'
                        )
                    } catch (error) {
                        this.logger.error(
                            { error },
                            'Error handling AgentCreated event for MPC wallet creation/update'
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
