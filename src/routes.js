const express = require('express');
const GetData = require('./controllers/GetData');
const Config = require('./controllers/Config');
const SendData = require('./controllers/SendData');

const routes = express.Router();

routes.get('/get', GetData.index);
routes.get('/config', Config.index);
routes.get('/send', SendData.index);

module.exports = routes;