'use strict';
module.exports.get = (req, name_param) => {
    if (req && req.swagger && req.swagger.params) {
        const params = req.swagger.params;
        if (name_param === '_limit' || name_param === '_page') {
            return (params[name_param] && typeof params[name_param].value === 'number')
                ? params[name_param].value
                : null;
        } else {
            return (params[name_param] && typeof params[name_param].value !== 'undefined')
                ? params[name_param].value
                : null;
        }
    } else {
        return null;
    }
}

