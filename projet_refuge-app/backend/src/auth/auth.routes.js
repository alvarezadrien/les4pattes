import express from 'express';
import { register, login, me } from './auth.controller.js';
import { validate } from './../api/middlewares/validation.middleware.js';
import { authSchema } from './auth.schema.js';
import { authenticate } from './auth.middleware.js';

const router = express.Router();

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);
router.get('/me', authenticate, me);

export { router as authRouter }; 