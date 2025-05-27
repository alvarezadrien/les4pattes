import { ERROR_TYPES } from './index.js';

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = ERROR_TYPES.VALIDATION;
  }
}
