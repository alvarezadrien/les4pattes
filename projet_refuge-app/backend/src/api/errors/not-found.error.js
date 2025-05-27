import { ERROR_TYPES } from './index.js';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = ERROR_TYPES.NOT_FOUND;
  }
};

