import { Module } from '@nestjs/common';

import { SgnetController } from './sgnet.controller';

@Module({
    controllers: [SgnetController],
})
export class SgnetModule {}
