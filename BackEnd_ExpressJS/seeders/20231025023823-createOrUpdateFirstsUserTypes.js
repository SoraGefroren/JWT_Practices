'use strict';

const UserType = require('../app/models/userType');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const aryUserTypes = [
      {
        strUserType: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strUserType: 'Guest',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];    
    for (let dataUserType of aryUserTypes) {
      let oneUserType = await UserType.findOne({
        where: {
          strUserType: dataUserType.strUserType
        }
      });
      if (!oneUserType) {
        await UserType.create(dataUserType);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblUserType', null, {});
  }
};
