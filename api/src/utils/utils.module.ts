import { Module } from '@nestjs/common'

import { EthersUtilsService } from './ethers.utils.service'
import { ViemUtilsService } from './viem.utils.service'

@Module({
    providers: [ViemUtilsService, EthersUtilsService],
    exports: [ViemUtilsService, EthersUtilsService],
})
export class UtilsModule {}
