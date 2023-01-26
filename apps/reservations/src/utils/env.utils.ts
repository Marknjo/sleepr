import * as Joi from 'joi'

const validationSchema = () =>
  Joi.object({
    // APP
    API_PORT: Joi.number().default(3000),
    TCP_AUTH_PORT: Joi.number().required(),
    TCP_AUTH_HOST: Joi.string().required(),
  })

export default validationSchema
