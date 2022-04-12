
const express = require('express')
const routes = express();
const controller = require('../controller/users')


/**
 * Create new data
 */

routes.post('/', controller.addUsers)
routes.post('/login', controller.login)





module.exports = routes;