import express from 'express';

import { authenticate, hasRole } from '../../auth/auth.middleware.js';
import { validate } from '../../api/middlewares/validation.middleware.js';

import { findAll, findOne, update, remove } from './user.controller.js';
import { filterUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } from './user.schema.js';

const router = express.Router();

router.route('/')
  .get(
    authenticate,
    hasRole(['admin']),
    validate(filterUserSchema),
    findAll
  );

router.route('/:id')
  .get(
    authenticate,
    hasRole(['admin']),
    validate(getUserSchema),
    findOne
  )
  .put(
    authenticate,
    hasRole(['admin']),
    validate(updateUserSchema),
    update
  )
  .delete(
    authenticate,
    hasRole(['admin']),
    validate(deleteUserSchema),
    remove
  );

export { router as userRouter }; 