import Logger from '../config/logger.config.js';
import { ERROR_TYPES } from '../errors/index.js';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  // --- Manage logs recording according to the error type

  switch(err.constructor.name) {
  case ERROR_TYPES.FORBIDDEN:
    Logger.warn(err.message, { area: err.name });
    break;
  case ERROR_TYPES.NOT_FOUND:
    Logger.warn(err.message, { area: err.name });
    break;
  case ERROR_TYPES.SERVER:
    Logger.error(err.message, { area: err.name }, err.stack);
    break;
  case ERROR_TYPES.UNAUTHORIZED:
    Logger.error(err.message, { area: err.name }, err.stack);
    break;
  case ERROR_TYPES.VALIDATION:
    Logger.warn(err.message, { area: err.name, user: req?.user?._id, body: { ...req.body, password: req.body?.password ? '********' : undefined }, query: req.query });
    break;
  default:
    Logger.error(err.message, { area: err.name, user: req?.user?._id, body: { ...req.body, password: req.body?.password ? '********' : undefined }, query: req.query }, err.stack);
  }

  Logger.debug(err.message, { area: err.name, user: req?.user?._id, body: { ...req.body, password: req.body?.password ? '********' : undefined }, query: req.query });

  // --- Manage response according to the error type

  let statusCode = null;
  let message = null;

  switch(err.constructor.name) {
  // Custom errors
  case ERROR_TYPES.FORBIDDEN:
  case ERROR_TYPES.NOT_FOUND:
  case ERROR_TYPES.UNAUTHORIZED:
  case ERROR_TYPES.VALIDATION:
    statusCode = err.statusCode;
    message = err.message;
    break;
  // JS native errors ( Error | EvalError | RangeError | SyntaxError | TypeError | URIError )
  case 'Error':
  case 'EvalError':
  case 'TypeError':
  case 'SyntaxError':
  case 'RangeError':
  case 'URIError':
    statusCode = 500;
    message = 'Internal Server Error';
    break;
  // MongoDB errors
  case 'MongoServerError':
    switch(err.code) {
    case 11000:
      statusCode = 409;
      message = 'Duplicate key';
      break;
    default:
      statusCode = 500;
      message = 'Internal Server Error';
    }
    break;
  // Mongoose errors
  case 'CastError':
    statusCode = 400;
    message = 'Bad Request';
    break;
  // All the other errors
  default:
    statusCode = 500;
    message = 'Internal Server Error';
  }
  
  res.status(statusCode).json({ message });
};
