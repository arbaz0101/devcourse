const httpStatus = require('http-status');
const user_helper = require('./user_helper');



async function signUp(req){

    try{
        const {email,password,fullname} = req.body;
        const results = await user_helper.createUser(email,password,fullname);

        if(results.message ===  "User already exists"){
            return{
                message:"User already exists",
                status:httpStatus.UNPROCESSABLE_ENTITY,
                data:null
            }
        }

        return{
                message:"User Created",
                status:httpStatus.CREATED,
                data:null
        }
        

    }catch(error){
        return{
            error:"Error",
            message:error.message,
            status:httpStatus.INTERNAL_SERVER_ERROR
        }
    }


}


module.exports= {
    signUp
}