import Joi from 'joi';

export const objectId = Joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/);

