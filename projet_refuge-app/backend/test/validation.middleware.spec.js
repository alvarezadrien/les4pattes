import { validate } from '../src/api/middlewares/validation.middleware.js';
import { ValidationError } from '../src/api/errors/validation.error.js';
import Joi from 'joi';
import { jest, expect, describe, it } from '@jest/globals';

describe('Validation Middleware', () => {
  const testSchema = {
    body: Joi.object({
      username: Joi.string().min(3).required(),
      age: Joi.number().integer().min(18).required()
    })
  };

  it('should pass validation with valid data', () => {
    const req = {
      body: {
        username: 'john',
        age: 25
      }
    };
    const res = {};
    const next = jest.fn();

    const middleware = validate(testSchema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

    it('should fail validation with invalid data', () => {
      const req = {
        body: {
          username: 'jo', // trop court
          age: 15 // trop jeune
        }
      };
      const res = {};
      const next = jest.fn();

      const middleware = validate(testSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    });

    it('should handle missing required fields', () => {
      const req = {
        body: {
          username: 'john'
            // age manquant
        }
      };
      const res = {};
      const next = jest.fn();

      const middleware = validate(testSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    });
});
