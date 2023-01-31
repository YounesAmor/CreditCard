import Joi from "joi";
export const schema = Joi.object().keys({
  name: Joi.string().required(),
  number: Joi.string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required(),
  cvc: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
  month: Joi.string()
    .length(2)
    .pattern(/^[0-9]+$/)
    .required(),
  year: Joi.string()
    .length(2)
    .pattern(/^[0-9]+$/)
    .required(),
});
export const schemaDictionary = {
  name: Joi.string().required(),
  number: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(16)
    .required()
    .messages({
      "string.pattern.base": "Credit Card should only contain numbers",
      "string.length": "Credit card should contain 16 characters",
    }),
  cvc: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
  month: Joi.number().min(1).max(31).required(),
  year: Joi.number().min(1).max(99).required(),
};
