import Joi from 'joi';
import { email } from './../../api/schemas/email.schema.js';
import { objectId } from './../../api/schemas/object-id.schema.js';

export const filterUserSchema = {
  query: Joi.object({
    search: Joi.string().max(50).trim().optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
};

export const updateUserSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    email,
  }),
};

export const getUserSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

export const deleteUserSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
};
