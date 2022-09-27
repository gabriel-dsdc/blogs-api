const Joi = require('joi');

const REQUIRED_FIELD_MSG = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
  password: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const tokenSchema = Joi.string().required().messages({
    'any.required': 'Token not found',
    'string.empty': 'Token not found',
  });

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" is required',
    'string.empty': '"name" is required',
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
  content: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
  categoryIds: Joi.array().items(Joi.number()).required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
});

const editPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
  content: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD_MSG,
    'string.empty': REQUIRED_FIELD_MSG,
  }),
});

module.exports = {
  loginSchema,
  userSchema,
  tokenSchema,
  categorySchema,
  postSchema,
  editPostSchema,
};
