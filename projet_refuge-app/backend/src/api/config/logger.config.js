import { config } from './env.config.js';

import * as winston from 'winston';
import morgan from 'morgan';
import SlackHook from 'winston-slack-webhook-transport';

import { format } from 'winston';

const formater = format.printf(( { level, message, timestamp } ) => {
  return `${timestamp} [${level}] ${message}`;
});

const configuration = {
  development: {
    file: [
      new winston.transports.File({
        level: 'http',
        format: format.combine(
          format.timestamp(),
          formater
        ),
        filename: `${config.logsPath}/access.log`,
        handleExceptions: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        level: 'error',
        format: format.combine(
          format.timestamp(),
          formater
        ),
        filename: `${config.logsPath}/error.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        level: 'debug',
        format: format.combine(
          format.timestamp(),
          formater
        ),
        filename: `${config.logsPath}/combined.log`,
        handleExceptions: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ],
    stream: [
      new winston.transports.Console({
        level: 'debug',
        format: format.combine(
          format.timestamp(),
          format.colorize({ all: true }),
          formater
        ),
        handleExceptions: true,
      }),
    ]
  },
  production: {
    http: [
      new SlackHook({
        level: 'error',
        formatter: (info) => {
          return {
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `👹 *${info.level.toUpperCase()}* \n ${info.message}`
                }
              }
            ]
          };
        },
        webhookUrl: config.slackWebhookUrl,
        username: 'Karpbot',
        iconEmoji: '🥷',
      }), 
    ],
    stream: [
      new winston.transports.Console({
        level: 'error',
        format: format.combine(
          format.timestamp(),
          format.printf(({ level, message, timestamp }) => {
            return JSON.stringify({ timestamp, level, message });
          })
        ),
        handleExceptions: true,
      }),
    ]
  }
};

export class Logger {
  get token() {
    return config.logsToken;
  }

  logger = null;

  constructor(configuration) {
    const options = configuration[config.environment];

    this.logger = winston.createLogger({
      transports: Object
        .keys(options)
        .map((key) => options[key])
        .flat(),
      exitOnError: false
    });
  }

  /**
   * @description
   */
  writeStream() {
    return morgan(this.token, {
      stream: {
        write:(message) => {
          this.logger.log('info', message.substring(0, message.lastIndexOf('\n')));
        }
      }
    });
  }

  /**
   * Logs a message with the specified context.
   *
   * @param level - The level for the log message.
   * @param message - The message to be logged.
   * @param context - The context for the log message.
   */
  log(level, message, context) {
    this.logger.log(level, `${message}`, context);
  }

  /**
   * Logs a fatal error message with the specified context.
   *
   * @param message - The error message to log.
   * @param { area: string, user: string, body: object, query: object } context - The context in which the error occurred.
   */
  fatal(message, context) {
    this.logger.log('fatal', `${message}`, context);
  }

  /**
   * Logs an error message.
   *
   * @param message - The error message to log.
   * @param { area: string } context - The context or module name where the error occurred.
   * @param trace - Optional. The stack trace associated with the error.
   */
  error(message, context, trace) {
    this.logger.error(`[${context.area}] ${message} ${trace ? `\n${trace}` : ''}`);
  }

  /**
   * Logs a warning message with the specified context.
   *
   * @param message - The warning message to be logged.
   * @param { area: string } context - The context for the warning message.
   */
  warn(message, context) {
    this.logger.warn(`[${context.area}] ${message}`);
  }

  /**
   * Logs a verbose message with the specified context.
   * This method is only executed if the environment is not set to 'production'.
   *
   * @param message - The message to be logged.
   */
  verbose(message) {
    this.logger.verbose(`${message}`);
  }

  /**
   * Logs a debug message with the specified context.
   * This method is only executed if the environment is not set to 'production'.
   *
   * @param message - The debug message to log.
   * @param { area: string, user: string, body: object, query: object } context - The context for the debug message
   */
  debug(message, context) {
    this.logger.debug(`[${context.area}] ${`[${context.user || 'anonymous'}]`} ${message} [${JSON.stringify(context.body)}] [${JSON.stringify(context.query)}]`);
  }
};

export default new Logger(configuration);