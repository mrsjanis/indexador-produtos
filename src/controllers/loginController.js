'use strict';

const LoginService = require("../services/loginService");
const helpers = require("../helpers");

module.exports.postLogin = async (req, res) => {
    try {
        const result = await new LoginService().login(req.body);
        helpers.response.send(res, helpers.statusCode.OK, result);
    } catch (err) {
        helpers.response.error(res, err);
    }
}