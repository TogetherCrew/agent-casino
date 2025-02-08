import * as Joi from 'joi'

import { registerAs } from '@nestjs/config'

export default registerAs('cdp', () => ({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    privateKey: process.env.CDP_PRIVATE_KEY,
}))
export const cdpConfigSchema = {
    CDP_API_KEY_NAME: Joi.string().required().description('CDP api key name'),
    CDP_PRIVATE_KEY: Joi.string().required().description('CDP private key'),
}
