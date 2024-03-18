import { createLogger, transports, format } from 'winston';

let loggerInstance = null;
let environmentType = '';

function initializeLogger() {
  if (process.env.NODE_ENV === 'test') {
    logTransport = new transports.Console();
  } else {
    logTransport = new transports.File({ filename: '/var/logs/webapp.log' }); // File transport for production
  }

  return createLogger({
    level: 'info',
    format: format.json(),
    transports: [logTransport]
  });
}

export function setEnvironmentType(type) {
  environmentType = type
}

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(environmentType);
  }
  return loggerInstance;
}
