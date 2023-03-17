'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     * 
     * create user table 
     */
    return queryInterface.createTable("users",{
      id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      name:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false,
      },
      email:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      password:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
      },
      is_active:{
        type:Sequelize.DataTypes.BOOLEAN,
        defaultValue:true
      }

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     * drop user table 
     */
    return queryInterface.dropTable("users")
  }
};
