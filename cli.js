#!/usr/bin/env node
require("dotenv").config();
let tunnelFactory = require('./main');
let tunnel = tunnelFactory
  .from(process.env.FROM_HOST, process.env.FROM_PORT)
  .through(
    process.env.PROXY_TYPE,
    process.env.PROXY_HOST,
    process.env.PROXY_PORT,
    process.env.PROXY_USER,
    process.env.PROXY_PASSWORD
  )
  .to(process.env.SERVER_HOST, process.env.SERVER_PORT)
  .start();
