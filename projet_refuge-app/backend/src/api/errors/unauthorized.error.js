import { ERROR_TYPES } from './index.js';

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = ERROR_TYPES.UNAUTHORIZED;
  }
}

