const models = require('../../../models/index');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')

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


async function Login(password,email){
    const user = await models.users.findOne({
        filter:{
            email
        },
        attributes:["name","password","id"],
        include:[
            {
                model:models.user_user_roles,
                as:"user_roles",
                attributes:["user_role_id"],
                required:true
            }
        ]
    });
    if(!user){
        return{
            error:"Error",
            message:"User not found",
            status:httpStatus.NOT_FOUND
        }
    }
    const user_role = await models.user_roles.findOne({
        filter:{
            id:user.dataValues.user_roles.dataValues.user_role_id,
        },
        attributes:['name']
    })

    const verifiedPassword = await  decryptPassword(password,user.dataValues.password);
    if(!verifiedPassword){
        return{
            error:"Error",
            message:"Invalid password",
            status:httpStatus.BAD_REQUEST
        }
    }

    const token = jwt.sign({
        user_id:user.dataValues.id,
        user_name:user.dataValues.name,
        role:user_role.dataValues.name
    },
    "secretKEY",
    {
        expiresIn:"10min"
    }
    )

    return{
        data:{
            user:{
                id:user.dataValues.id,
                name:user.dataValues.name,
                role:user_role.dataValues.name,
                token
            }
        },
        message:"User Logged In",
        status:httpStatus.OK
    }

}


async function decryptPassword(password,encryptedPassword){
    
    const decryptedPassword = await bcrypt.compareSync(password,encryptedPassword)
    return decryptedPassword
}



module.exports ={
    createUser,
    Login
}