'use strict';
module.exports = class BadRequestException {

    constructor(message) {
        this.message = message;
    }
}