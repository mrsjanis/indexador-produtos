const exceptions = require("../exceptions");
const fs = require('fs');
const path = require('path');
const jwt = require('../middlewares/jwtMiddleware');

module.exports = class LoginService {
    async login(obj) {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../users.json').toString()));
        const userExists = users.find(item => {
            if (item.username === obj.username && item.password === obj.password)
                return item;
        });
        if (userExists)
            return { token: jwt.issueToken({
                user: userExists.username,
                domain: userExists.domain ?? null
            }) };
        else
            throw new exceptions.UnauthorizedException('login inválido');
    }
}