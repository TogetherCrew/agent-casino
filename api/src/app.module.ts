import { LoggerModule } from 'nestjs-pino'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AgentFactoryListenerService } from './agent-factory/agent-factory-listener.service'
import { AgentModule } from './agent/agent.module'
import { AgentService } from './agent/agent.service'
import { CdpModule } from './cdp/cdp.module'
import { CdpService } from './cdp/cdp.service'
import { configModules, configValidationSchema } from './config'
import { pinoConfig } from './config/pino.config'
import { UtilsModule } from './utils/utils.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: configModules,
            validationSchema: configValidationSchema,
            isGlobal: true,
        }),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: pinoConfig,
        }),
        AgentModule,
        UtilsModule,
        CdpModule,
    ],
    controllers: [],
    providers: [AgentFactoryListenerService, CdpService, AgentService],
})
export class AppModule {}
