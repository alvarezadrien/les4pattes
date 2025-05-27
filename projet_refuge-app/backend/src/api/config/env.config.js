import dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env' });

export const environments = { DEVELOPMENT : 'development' , STAGING : 'staging', PRODUCTION : 'production' };

export const config = {
  port: process.env.PORT || 3000,
  secret: process.env.JWT_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  environment: process.env.NODE_ENV || 'development',
  mongo: process.env.MONGO_URI,
  api: process.env.API_VERSION,
  logsLevel: process.env.LOGS_LEVEL || 'debug',
  logsToken: process.env.LOGS_TOKEN,
  logsPath: process.env.LOGS_PATH,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
};
