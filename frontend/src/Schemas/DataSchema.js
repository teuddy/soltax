const Joi = require('joi')
const brandsSchema = Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      brand_name: Joi.string().required(),
      models: Joi.array().items(
        Joi.object({
          id: Joi.number().required(),
          name: Joi.string().required(),
          years: Joi.array().items(Joi.number()).required(),
          versions: Joi.array().items(Joi.string()).required()
        })
      ).required(),
    })
  );

module.exports = brandsSchema