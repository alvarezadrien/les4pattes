import { ERROR_TYPES } from './index.js';

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = ERROR_TYPES.SERVER;
  }
}

