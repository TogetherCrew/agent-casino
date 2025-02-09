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
    public async test() {
        try {
            const apiKeyName = this.configService.get<string>('cdp.apiKeyName')

            const privateKey = this.configService.get<string>('cdp.privateKey')

            Coinbase.configure({
                apiKeyName: apiKeyName,
                privateKey: privateKey,
            })
            const wallet = await Wallet.create()
            console.log(wallet)
        } catch (err) {
            console.log(err)
        }
    }
}
