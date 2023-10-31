'use strict';
const bcrypt = require('bcrypt');
const User = require('../app/models/user');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('test123', 10);
    const aryUsers = [
      {
        strUserName: 'Karen Haide',
        strEmail: 'karen_haide@testo.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strUserName: 'Smantha Monfil',
        strEmail: 'smantha_monfil@testo.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strUserName: 'Sonia Luna',
        strEmail: 'sonia_luna@testo.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    for (let dataUser of aryUsers) {
      let oneUser = await User.findOne({
        where: {
          strEmail: dataUser.strEmail
        }
      });
      if (!oneUser) {
        await User.create(dataUser);
      }
    }
  },
  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblUser', null, {});
  }
};