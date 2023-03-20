const models = require('../../models/index');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');


async function createUser(email,password,fullname){
    const verifyUser = await models.users.findOne(
        {
            where:{
                email
            },
            attributes:['id','email']
        }
    );

    if(verifyUser){
        return{
            message:"User already exists",
            status:httpStatus.UNPROCESSABLE_ENTITY,
            data:null
        }
    }

    await models.users.create({
        email,
        password:await hashingPassword(password),
        name:fullname
    })

    return{
        message:"User Created",
        status:httpStatus.CREATED,
        data:null
    }
}



async function hashingPassword(password){
    const hashedPassword = await bcrypt.hashSync(password,10);
    return hashedPassword;
}



module.exports ={
    createUser
}