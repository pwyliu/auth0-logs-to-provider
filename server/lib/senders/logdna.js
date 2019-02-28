const Logdna = require('logdna');

const config = require('../config');
const logger = require('../logger');

module.exports = () => {
  const logdna = Logdna.createLogger(
    config('LOGDNA_INGESTION_KEY'),
    {
      hostname: config('LOGDNA_HOSTNAME') || 'auth0-logs',
      app: config('LOGDNA_APPLICATION_NAME') || 'auth0',
      tags: ['auth0']
    }
  );

  return (logs, callback) => {
    if (!logs || !logs.length) {
      return callback();
    }

    logger.info(`Sending ${logs.length} logs to LogDNA.`);

    loggly.log(logs, (err) => {
      if (err) {
        logger.info('Error sending logs to LogDNA', err);
        return callback(err);
      }

      logger.info('Upload complete.');

      return callback();
    });
  };
};
