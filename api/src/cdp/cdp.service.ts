import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { Coinbase, Wallet } from '@coinbase/coinbase-sdk'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CdpService {
    constructor(
        private readonly configService: ConfigService,
        @InjectPinoLogger(CdpService.name)
        private readonly logger: PinoLogger
    ) {}

    public async createMpcWallet() {
        try {
            const apiKeyName = this.configService.get<string>('cdp.apiKeyName')
            const privateKey = this.configService.get<string>('cdp.privateKey')

            Coinbase.configure({
                apiKeyName,
                privateKey,
            })

            const wallet = await Wallet.create()
            this.logger.info({ wallet }, 'MPC wallet created')

            return wallet
        } catch (err) {
            this.logger.error({ err }, 'Failed to create MPC Wallet')
            throw err
        }
    }
}
