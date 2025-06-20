require('dotenv').config();

const grpcserver = require('./settings/server');
const server = new grpcserver();

server.listen();