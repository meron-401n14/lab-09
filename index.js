'use strict';

require('dotenv').config();


//client side server

require('./lib/server.js').start(process.env.PORT);
