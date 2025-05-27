import app from './api/config/app.config.js';
import { config } from './api/config/env.config.js';
import { connect } from './api/config/database.config.js';
import Logger from './api/config/logger.config.js';

const [major, minor] = process.versions.node.split('.').map( parseFloat );

if(major < 20  || major === 20 && minor <= 0)
{
  Logger.error('--- The node version of the server is too low for modern node programming');
  process.exit(1);
}

connect();

const server = app.listen(config.port, () => {
  Logger.verbose(`Server is running on port ${config.port}`, 'test');
});

process.on('SIGTERM', () => {
  server.close(() => {
    Logger.log('Server closed');
  });
});
