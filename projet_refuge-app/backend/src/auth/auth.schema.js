import Joi from 'joi';

import { email } from './../api/schemas/email.schema.js';
import { password } from './../api/schemas/password.schema.js';

export const authSchema = {
  body: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
};

