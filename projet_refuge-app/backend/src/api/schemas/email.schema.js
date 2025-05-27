import Joi from 'joi';

export const email = Joi
  .string()
  .email()
  .max(50)
  .trim();

