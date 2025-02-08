import { LoggerModule } from 'nestjs-pino'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AgentFactoryListenerService } from './agent-factory-listener/agent-factory-listener.service'
import { configModules, configValidationSchema } from './config'
import { pinoConfig } from './config/pino.config'
import { MpcWalletModule } from './mpc-wallet/mpc-wallet.module'
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
        MpcWalletModule,
        UtilsModule,
    ],
    controllers: [],
    providers: [AgentFactoryListenerService],
})
export class AppModule {}
