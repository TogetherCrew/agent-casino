import { Test, TestingModule } from '@nestjs/testing'
import { MpcWalletService } from './mpc-wallet.service'

describe('MpcWalletService', () => {
    let service: MpcWalletService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MpcWalletService],
        }).compile()

        service = module.get<MpcWalletService>(MpcWalletService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
