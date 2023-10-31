'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('tblUserType', {
          ideUserType: {
              type: Sequelize.BIGINT,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
          strUserType: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
          },
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('tblUserType');
  }
};
