import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { AgentService } from './agent.service'
import { FundingWalletDto, FundingWalletResponse } from './dto/funding-wallet'
import {
    WithdrawBodyDto,
    WithdrawParamsDto,
    WithdrawResponse,
} from './dto/withdraw'

@Controller('mpc-wallet')
export class AgentController {
    constructor(private readonly agentService: AgentService) {}

    @Get(':chainId/:agentId/funding-wallet')
    @ApiOperation({ summary: 'Get funding wallet address.' })
    @ApiOkResponse({
        description: 'Funding wallet address.',
        type: FundingWalletResponse,
    })
    async getFundingWallet(@Param() fundingWalletDto: FundingWalletDto) {
        const walletId = await this.agentService.getFundingWallet(
            fundingWalletDto.chainId,
            fundingWalletDto.agentId
        )

        return { walletId }
    }

    @Post(':chainId/:agentId/withdraw')
    @ApiOperation({ summary: 'request to withdraw funds.' })
    @ApiOkResponse({
        description: 'Transaction hash.',
        type: WithdrawResponse,
    })
    async withdrawFunds(
        @Param() withdrawParamsDto: WithdrawParamsDto,
        @Body() withdrawBodyDto: WithdrawBodyDto
    ) {
        const txHash = await this.agentService.withdrawFunds({
            chainId: withdrawParamsDto.chainId,
            message: withdrawBodyDto.message,
            signature: withdrawBodyDto.signature,
        })

        return { hash: txHash }
    }
}
