import { ERROR_TYPES } from './index.js';

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = ERROR_TYPES.FORBIDDEN;
  }
};

