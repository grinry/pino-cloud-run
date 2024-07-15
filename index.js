const build = require('pino-abstract-transport');

function getSeverity (level) {
  switch (level) {
    case 10:
    case 20:
      return 'DEBUG';
    case 30:
      return 'INFO';
    case 40:
      return 'WARNING';
    case 50:
      return 'ERROR';
    case 60:
      return 'CRITICAL';
    default:
      return 'DEFAULT';
  }
}

function formatLog (obj) {
  var log = Object.assign({}, obj);
  delete log.msg;
  delete log.level;
  delete log.time;
  // delete log.pid;
  // delete log.hostname;
  return {
    severity: getSeverity(obj.level),
    timestamp: obj.time,
    jsonPayload: {
      message: obj.msg,
      context: log,
    }
  };
}

module.exports = async function (opts) {
  return build(async function (source) {
    for await (const obj of source) {
      console.log(
        JSON.stringify(formatLog(obj)),
      );
    }
  });
}
