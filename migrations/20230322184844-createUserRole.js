'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable("user_roles",{
      id:{
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        type:Sequelize.DataTypes.INTEGER
      },
      name:{
        allowNull:false,
        type:Sequelize.DataTypes.STRING
      },
      created_at:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
    return await queryInterface.bulkInsert("user_roles",[
      {
        id:1,
        name:"Customer",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id:2,
        name:"Admin",
        created_at:new Date(),
        updated_at:new Date()
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable("user_roles")
  }
};
