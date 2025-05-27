import { ForbiddenError } from './forbidden.error.js';
import { UnauthorizedError } from './unauthorized.error.js';
import { ValidationError } from './validation.error.js';
import { ServerError } from './server.error.js';
import { NotFoundError } from './not-found.error.js';

export { ForbiddenError, UnauthorizedError, ValidationError, ServerError, NotFoundError };

export const ERROR_TYPES = {
  FORBIDDEN: 'ForbiddenError',
  UNAUTHORIZED: 'UnauthorizedError',
  VALIDATION: 'ValidationError',
  SERVER: 'ServerError',
  NOT_FOUND: 'NotFoundError'
};