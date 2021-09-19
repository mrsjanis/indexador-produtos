'use strict';

module.exports = class UnprocessableEntityException {

    constructor(message) {
        this.message = message;
    }
}