import * as Joi from 'joi'

const validationSchema = () =>
  Joi.object({
    // APP
    API_PORT: Joi.number().default(3000),
    DB_URL: Joi.string().required(),
  })

export default validationSchema
