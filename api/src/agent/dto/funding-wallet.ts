import { Transform } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { SUPPORTED_CHAINS } from '../../shared/constants/chain.constants'

export class FundingWalletDto {
    @Transform(({ value }) => parseInt(value, 10))
    @ApiProperty({
        description: 'Chain Id',
        example: '84532',
        required: true,
        enum: SUPPORTED_CHAINS,
    })
    @IsNumber()
    @IsNotEmpty()
    @IsIn(SUPPORTED_CHAINS)
    readonly chainId: number

    @Transform(({ value }) => parseInt(value, 10))
    @ApiProperty({
        description: 'Agent Id',
        example: '1',
        required: true,
    })
    @IsNotEmpty()
    readonly agentId: number
}

export class FundingWalletResponse {
    @ApiProperty({ description: 'Funding wallet address.' })
    address: string
}
