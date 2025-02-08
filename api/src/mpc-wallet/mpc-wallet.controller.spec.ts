import { Test, TestingModule } from '@nestjs/testing';
import { MpcWalletController } from './mpc-wallet.controller';

describe('MpcWalletController', () => {
  let controller: MpcWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MpcWalletController],
    }).compile();

    controller = module.get<MpcWalletController>(MpcWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
