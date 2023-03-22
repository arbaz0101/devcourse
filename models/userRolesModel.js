const { DataTypes, literal } = require("sequelize");

module.exports = function (sequelize) {
  const UserRoles = sequelize.define(
    "user_roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
      updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal("CURRENT_TIMESTAMP"),
      }
    },
    {
      underscoredAll: true,
      underscored: true,
      timestamps: true,
     
    }
  );

  UserRoles.associate = function(model){
    UserRoles.hasOne(model.user_user_roles,{
        foreignKey:{
            name:"user_role_id",
            allowNull:false
        },
        as:"user_roles"
    })
  }

  return UserRoles;
};