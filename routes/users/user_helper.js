const models = require('../../models/index');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');


async function createUser(email,password,fullname,type){
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

    const users = await models.users.create({
        email,
        password:await hashingPassword(password),
        name:fullname
    },{
        returning:true
    });
    if(users){
        const role = await models.user_roles.findOne({
            where:{
                id:type
            },
            attributes:['id',"name"]
        });

        await models.user_user_roles.create({
            user_id:users.dataValues.id,
            user_role_id:role.dataValues.id
        })
    }

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