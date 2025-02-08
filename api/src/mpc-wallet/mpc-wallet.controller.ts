import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { FundingWalletDto, FundingWalletResponse } from './dto/funding-wallet'
import { MpcWalletService } from './mpc-wallet.service'

@Controller('mpc-wallet')
export class MpcWalletController {
    constructor(private readonly mpcWalletService: MpcWalletService) {}

    @Get(':chainId/:agentId/funding-wallet')
    @ApiOperation({ summary: 'Get funding wallet address.' })
    @ApiOkResponse({
        description: 'Funding wallet address.',
        type: FundingWalletResponse,
    })
    async getFundingWallet(@Param() fundingWalletDto: FundingWalletDto) {
        const walletId = await this.mpcWalletService.getFundingWallet(
            fundingWalletDto.chainId,
            fundingWalletDto.agentId
        )

        return { walletId }
    }
}
