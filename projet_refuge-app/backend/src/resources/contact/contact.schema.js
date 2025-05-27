import Joi from 'joi';
import { objectId } from './../../api/schemas/object-id.schema.js';
import { email } from './../../api/schemas/email.schema.js';
import { LIST } from './contact.model.js';

const name = Joi.string().min(3).max(40).trim();
const phone = Joi.string().min(10).max(15).trim();
const avatar = Joi.string().regex(/^[0-9a-fA-F]{1,64}\.(jpg|jpeg|png)$/).trim();

export const filterContactSchema = {
  query: Joi.object({
    search: Joi.string().optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
};

export const createContactSchema = {
  body: Joi.object({
    name: name.required(),
    email: email.required(),
    phone: phone.required(),
    avatar: avatar.optional(),
    list: Joi.string().valid(...Object.values(LIST)).optional()
  }),
};

export const updateContactSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    name: name.optional(),
    email: email.optional(),
    phone: phone.optional(),
    avatar: avatar.optional(),
    list: Joi.string().valid(...Object.values(LIST)).optional()
  }),
};

export const deleteContactSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
};
