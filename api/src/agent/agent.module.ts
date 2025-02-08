import { Module } from '@nestjs/common'

import { UtilsModule } from '../utils/utils.module'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'

@Module({
    imports: [UtilsModule],

    controllers: [AgentController],
    providers: [AgentService],
})
export class MpcWalletModule {}
