'use strict';
const jwt = require("jsonwebtoken");
const config = require('config');
const helper = require('../helpers');
const logger = require('../log');

const key = 'b1762ecf-e334-48a4-86fe-67d6214ec8fd';

module.exports = class JwtMiddleware {
    static verifyToken(req, authOrSecDef, token, callback) {
        if (token && token.indexOf("Bearer ") == 0) {
            let tokenString = token.split(" ")[1];
            jwt.verify(tokenString, key, function (err, authData) {
                if (err) {
                    req.res.status(helper.statusCode.FORBIDDEN).send(new helper.ErrorResponse('Access Denied'));
                } else {
                    const tokenDecoded = jwt.decode(tokenString);
                    if (tokenDecoded?.domain === 'PHICOMPANY' && req.path?.search('/api/v1/phicompany') === -1) {
                        req.res.status(helper.statusCode.FORBIDDEN).send(new helper.ErrorResponse('Access Denied'));
                        return;
                    }
                    return callback(null);
                }
            });
        } else {
            req.res.status(helper.statusCode.FORBIDDEN).send(new helper.ErrorResponse('Access Denied'));
        }
    }

    static issueToken(user) {
        let options = {};
        if (config.get('env') === 'production') {
            options.expiresIn = '24h';
        }
        return jwt.sign(user, key, options);
    }

    static isValidToken(token) {
        try {
            jwt.verify(token, key);
            
            return true;
        } catch (err) {
            logger.error(err);
        }

        return false;
    }
}