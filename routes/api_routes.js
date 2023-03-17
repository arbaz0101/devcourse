const express = require('express');
const Router = express.Router();


Router.use("/users",require('./users/user_routes'));

Router.use('/payment',require('./payment/payment_routes'))


module.exports = Router;
