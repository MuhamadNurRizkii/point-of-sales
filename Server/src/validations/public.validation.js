import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  nama_depan: Joi.string().required(),
  nama_belakang: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { loginSchema, registerSchema };
