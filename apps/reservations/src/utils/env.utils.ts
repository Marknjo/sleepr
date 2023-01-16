import * as Joi from 'joi'

const validationSchema = () =>
  Joi.object({
    // APP
    API_PORT: Joi.number().default(3000),
  })

export default validationSchema
