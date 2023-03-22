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
    return queryInterface.createTable("user_user_roles",{
      user_id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"users",
          key:"id"
        }
      },
      user_role_id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"user_roles",
          key:"id"
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable("user_user_roles")
  }
};
