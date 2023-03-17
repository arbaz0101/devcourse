const express = require('express');
const bodyParser = require('body-parser')
const helmet = require("helmet");


const app = express();


app.use(helmet())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))


app.use("/api/v1",require('./routes/api_routes'))


module.exports = app;

/**
 * /api/v1/users/signup
 * /api/v1/payment/create
 */




/**
 * post for database entry user create id 1 
 * put :id ->1  database record ko update kardey ga 
 * delete :id 
 * patch
 *  req.body
 * 
 * get database say data fetch kar ta hai 
 * {
 * headers:
 * body:{
 * }
 * }
 */






