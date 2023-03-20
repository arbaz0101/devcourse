const express = require('express');
const httpStatus = require('http-status');
const Router = express.Router();
const userController = require('./user_controller');
const validate = require("./user_validation");



Router.post("/signup",validate.signUp,validate.validate,async (req,res)=>{
    const response  = await userController.signUp(req);
    if(response.status === httpStatus.CREATED)
        return res.send({message:response.message}).status(response.status);
    return res.status(response.status).send({error:response.error,message:response.message})
    

});

Router.post("/login");

Router.post("/logout")

/**
 * router
 *          3 connections
 * sign up
 * login
 * logout
 * 
 * api level routing
 * 
 * 
 * error status codes
 * 
 * 404 not found (database record not found)
 * 400 bad request (for invalid validation)
 * 422 unprocessable entity
 * 
 * 500 internal server error
 */

module.exports = Router;
