import * as Joi from 'joi'

const validationSchema = () =>
  Joi.object({
    // APP
    API_PORT: Joi.number().default(3000),
    TCP_PORT: Joi.number().required(),
    TCP_HOST: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
  })

export default validationSchema
