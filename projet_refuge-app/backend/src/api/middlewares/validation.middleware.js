import { ValidationError } from '../errors/validation.error.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const error = ['query', 'body', 'params']
      .filter( (property) => schema[property] && req[property])
      .map( (property) => schema[property].validate(req[property], { abortEarly: true, allowUnknown: false } ) )
      .filter(result => result.error)
      .map(result => result.error)
      .slice()
      .shift();

    if (error) {
      return next(new ValidationError(error.message));
    }

    next();
  } catch (error) {
    next(error);
  }
};
