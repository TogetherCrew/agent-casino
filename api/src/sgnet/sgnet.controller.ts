import { Controller, Post } from '@nestjs/common';

@Controller('sgnet')
export class SgnetController {
    @Post()
    getTest() {
        return { test: 'test' }
    }
}
