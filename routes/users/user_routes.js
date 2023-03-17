const express = require('express');

const Router = express.Router();

const model = require('../../models/index')

Router.post("/signup",async (req,res)=>{

    const {id,id2} = req.params
    const {offset} = req.query
    if(!req.body.email){
        return res.status(400).send({message:"error"})
        
    }
    return res.send({
        message:"hello",
        data:{email:req.body.email,status:200}
    }).status(200)

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
