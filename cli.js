#!/usr/bin/env node
let tunnelFactory = require('./main');
let tunnel = tunnelFactory
    .from(process.env.FROM_HOST, process.env.FROM_PORT)
    .through('socks5', process.env.PROXY_HOST, process.env.PROXY_PORT)
    .to(process.env.SERVER_HOST, process.env.SERVER_PORT)
    .start();
