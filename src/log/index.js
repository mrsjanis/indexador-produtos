'use strict';
let configLog = {
    transport: function (data) {
        console.log(data.output);
    }
}
const logger = require('tracer').console(configLog);

module.exports = class Log {
    static log(err) {
        logger.log(err);
    }
    static trace(err) {
        logger.trace(err);
    }
    static debug(err) {
        logger.debug(err);
    }
    static info(err) {
        logger.info(err);
    }
    static warn(err) {
        logger.warn(err);
    }
    static error(err) {
        logger.error(err);
    }
}