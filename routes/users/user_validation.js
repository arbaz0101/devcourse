const {check,validationResult,body} = require('express-validator');

module.exports = {
    signUp:[
        check("fullname").not().isEmpty(),
        check("password").isLength({min:6,max:15}).not().isEmpty(),
        check("email").isEmail().not().isEmpty()
    ],
    validate:(req,res,next)=>{
        const Errors = validationResult(req);
        if (!Errors.isEmpty()) {
           return res.status(422).send( Errors.errors.map((item) => { return `${item.msg} ${item.param}`; })[0]);
        }
        next()
    }
}

