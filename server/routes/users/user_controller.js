const httpStatus = require('http-status');
const user_helper = require('./user_helper');



async function signUp(req){

    try{
        const {email,password,fullname,type} = req.body;
        const results = await user_helper.createUser(email,password,fullname,type);

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
        console.error(error)
        return{
            error:"Error",
            message:"Internal Server Error",
            status:httpStatus.INTERNAL_SERVER_ERROR
        }
    }


}

async function login(req){
    const {password, email} = req.body;
    try{
        const response = await user_helper.Login(password,email);
        return response
    }catch(error){
        console.error(error)
        return{
            error:"Error",
            message:"Internal Server Error",
            status:httpStatus.INTERNAL_SERVER_ERROR
        }
    }
}


module.exports= {
    signUp,
    login
}