'use strict';

const statusCodeHttp = require('./statusCodeHttp');
const log = require('../log');
const exceptions = require('../exceptions');

module.exports = class ResponseHttp {

    static send(res, statusCode, data) {
        res.status(statusCode).send(typeof data === 'string' ? { text: data } : data);
    }

    static error(res, err) {
        if (err instanceof exceptions.UnauthorizedException) {
            this.send(res, statusCodeHttp.UNAUTHORIZED, err.message);
        } else if (err instanceof exceptions.NotFoundException) {
            this.send(res, statusCodeHttp.NOT_FOUND, err.message);
        } else if (err instanceof exceptions.BadRequestException) {
            this.send(res, statusCodeHttp.BAD_REQUEST, err.message);
        } else if (err instanceof exceptions.UnprocessableEntityException) {
            this.send(res, statusCodeHttp.UNPROCESSABLE_ENTITY, err.message);
        } else {
            log.error(err);
            this.send(res, statusCodeHttp.INTERNAL_SERVER_ERROR, `Internal Server Error;${err.message}`);
        }
    }
}