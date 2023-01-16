import * as Joi from 'joi'

const validationSchema = () =>
  Joi.object({
    // APP
    API_PORT: Joi.number().default(3001),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    JWT_REFRESH_TOKEN_TTL: Joi.number(),
  })

export default validationSchema
