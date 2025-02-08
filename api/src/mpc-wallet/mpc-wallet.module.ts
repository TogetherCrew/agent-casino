import { Module } from '@nestjs/common'
import { MpcWalletController } from './mpc-wallet.controller'
import { MpcWalletService } from './mpc-wallet.service'

@Module({
    controllers: [MpcWalletController],
    providers: [MpcWalletService],
})
export class MpcWalletModule {}
