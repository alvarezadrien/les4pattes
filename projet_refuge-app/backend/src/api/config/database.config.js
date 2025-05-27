import mongoose from 'mongoose';

import { config, environments } from './env.config.js';

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/** Print mongoose logs in dev env */
if (config.environment === environments.DEVELOPMENT) {
  mongoose.set('debug', true);
}

/**
* Connect to MongoDb server
*
* @returns {Object} Mongoose connection
*/
export const connect = () => {
  mongoose
    .connect(config.mongo)
    .then(() => {
      // eslint-disable-next-line no-console
      console.info('Connected to MongoDB:', config.mongo);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error('Error during connexion to MongoDB:', err);
      process.exit(1);
    });

  return mongoose.connection;
};
