const { DataTypes, literal } = require("sequelize");

module.exports = function (sequelize) {
  const UserRoles = sequelize.define(
    "user_user_roles",
    {
      user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"id"
        }
      },
      user_role_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"user_roles",
            key:"id"
        }
      }
    },
    {
      underscoredAll: true,
      underscored: true,
      timestamps: false,
    
    }
  );

  UserRoles.assocaite = function(model){
    UserRoles.belongsTo(model.users,{
        foreignKey:{
            name:"user_id",
            allowNull:false
        },
        as:"users"
    });
    UserRoles.belongsTo(model.user_roles,{
        foreignKey:{
            name:"user_role_id",
            allowNull:false
        },
        as:"user_roles"
    })
  }

  UserRoles.removeAttribute("id")

  return UserRoles;
};