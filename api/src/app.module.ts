import { LoggerModule } from 'nestjs-pino'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { configModules, configValidationSchema } from './config'
import { pinoConfig } from './config/pino.config'
import { MpcWalletModule } from './mpc-wallet/mpc-wallet.module'

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
