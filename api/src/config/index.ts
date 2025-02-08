import * as Joi from 'joi'

import appConfig, { appConfigSchema } from './app.config'
import loggerConfig, { loggerConfigSchema } from './logger.config'

export const configModules = [appConfig, loggerConfig]

export const configValidationSchema = Joi.object({
    ...appConfigSchema,
    ...loggerConfigSchema,
})
