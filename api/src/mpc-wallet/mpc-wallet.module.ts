import { Module } from '@nestjs/common'

import { UtilsModule } from '../utils/utils.module'
import { MpcWalletController } from './mpc-wallet.controller'
import { MpcWalletService } from './mpc-wallet.service'

@Module({
    imports: [UtilsModule],

    controllers: [MpcWalletController],
    providers: [MpcWalletService],
})
export class MpcWalletModule {}
