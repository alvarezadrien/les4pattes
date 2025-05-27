import Joi from 'joi';

export const password = Joi
  .string()
  .min(8)
  .max(50)
  .trim();
