import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Hex } from 'viem';

import { ApiProperty } from '@nestjs/swagger';

import { SUPPORTED_CHAINS } from '../../shared/constants/chain.constants';

export class WithdrawParamsDto {
    @Transform(({ value }) => parseInt(value, 10))
    @ApiProperty({
        description: 'Chain Id',
        example: '8453',
        required: true,
        enum: SUPPORTED_CHAINS,
    })
    @IsNumber()
    @IsNotEmpty()
    @IsIn(SUPPORTED_CHAINS)
    readonly chainId: number
}

export class WithdrawBodyDto {
    @ApiProperty({
        description: 'EIP-712 typed data object.',
        example: {
            domain: { name: 'agent-casino', version: '1', chainId: 8453 },
            types: {
                Withdraw: [
                    { name: 'agentId', type: 'uint256' },
                    { name: 'amount', type: 'uint256' },
                    { name: 'expireAt', type: 'uint256' },
                ],
            },
            primaryType: 'Withdraw',
            message: {
                agentId: 123,
                amount: '10000000000000000',
                expireAt: 1767097847,
            },
        },
    })
    @IsNotEmpty()
    @IsObject()
    message: Record<string, unknown>

    @ApiProperty({
        description: 'EIP-712 signature.',
        example: '0xSignature',
    })
    @IsString()
    @IsNotEmpty()
    signature: Hex
}
export class WithdrawResponse {
    @ApiProperty({ description: 'Transaction hash.' })
    hash: string
}
