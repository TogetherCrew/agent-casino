import * as Joi from 'joi'

import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
}))

export const appConfigSchema = {
    NODE_ENV: Joi.string()
        .valid('production', 'development', 'test')
        .required()
        .description('Application environment'),
    PORT: Joi.number().default(3000).required().description('Application port'),
}
