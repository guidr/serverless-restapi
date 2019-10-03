const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    FirstName: Joi.string(),
    LastName: Joi.string().optional(),
    Email: Joi.string().email().optional(),
    MarketingPreferences: Joi.array()
      .items(
        Joi.object({
          BrandName: Joi.string().required(),
          Channel: Joi.string()
            .valid('Email', 'Phone', 'Post')
            .required(),
          OptInStatus: Joi.boolean().required(),
        }),
      )
      .optional(),
  })
  .min(1)
  .strict();
