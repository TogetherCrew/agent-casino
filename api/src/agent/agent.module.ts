import { Module } from '@nestjs/common'

import { CdpModule } from '../cdp/cdp.module'
import { UtilsModule } from '../utils/utils.module'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'

@Module({
    imports: [UtilsModule, CdpModule],

    controllers: [AgentController],
    providers: [AgentService],
})
export class AgentModule {}
