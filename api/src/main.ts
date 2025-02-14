import * as compression from 'compression'
import helmet from 'helmet'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { setupSwagger } from './doc'
import { HttpExceptionFilter } from './shared/filters/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true })
    app.useLogger(app.get(Logger))
    app.useGlobalInterceptors(new LoggerErrorInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.use(helmet())
    app.use(compression())
    app.enableCors()

    const configService = app.get(ConfigService)
    const port = configService.get('app.port')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'api/v',
    })

    setupSwagger(app)

    await app.listen(port, () => {
        const logger = app.get(Logger)
        logger.log(`Server is running on port ${port}!.`, 'NestApplication')
    })
}

bootstrap()
