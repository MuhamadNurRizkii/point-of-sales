import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().valid("makanan", "minuman", "lain-lain").required(),
});

export { createProductSchema };
