'use strict'
const config = require('config');
const http = require('http');
const middlewares = require('./src/middlewares');
const log = require('./src/log');

const host = config.get('server').host;
const port = config.get('server').port;

const server = http.createServer(middlewares);
server.listen(port, async () => {
    log.info(`host: ${host}:${port} enviroment: ${config.get('env')}`);
});
