import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

import { Coinbase, Destination, Wallet } from '@coinbase/coinbase-sdk'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CdpService {
    private readonly apiKeyName: string
    private readonly privateKey: string

    constructor(
        private readonly configService: ConfigService,
        @InjectPinoLogger(CdpService.name)
        private readonly logger: PinoLogger
    ) {
        this.apiKeyName = this.configService.get<string>('cdp.apiKeyName')
        this.privateKey = this.configService.get<string>('cdp.privateKey')
        Coinbase.configure({
            apiKeyName: this.apiKeyName,
            privateKey: this.privateKey,
        })
        Coinbase.useServerSigner = true
    }

    public async createWallet() {
        try {
            return await Wallet.create({
                networkId: Coinbase.networks.BaseSepolia,
            })
        } catch (err) {
            this.logger.error({ err }, 'Failed to create MPC Wallet')
            throw err
        }
    }

    public async getWallet(walletId: string) {
        try {
            return Wallet.fetch(walletId)
        } catch (err) {
            this.logger.error({ err }, 'Failed to create MPC Wallet')
            throw err
        }
    }

    public async createTransfer(wallet: Wallet, destination: Destination) {
        console.log(destination, typeof destination)

        const transfer = await wallet.createTransfer({
            amount: 0.000001,
            assetId: Coinbase.assets.Eth,
            destination,
        })

        await transfer.wait()
        return transfer
    }
}
