const { DataTypes, literal } = require("sequelize");

module.exports = function (sequelize) {
  const Users = sequelize.define(
    "users",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unqiue: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  return Users;
};
