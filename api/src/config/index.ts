import * as Joi from 'joi'

import cdpConfig, { cdpConfigSchema } from '../cdp/config/cdp.config'
import appConfig, { appConfigSchema } from './app.config'
import loggerConfig, { loggerConfigSchema } from './logger.config'

export const configModules = [appConfig, loggerConfig, cdpConfig]

export const configValidationSchema = Joi.object({
    ...appConfigSchema,
    ...loggerConfigSchema,
    ...cdpConfigSchema,
})
