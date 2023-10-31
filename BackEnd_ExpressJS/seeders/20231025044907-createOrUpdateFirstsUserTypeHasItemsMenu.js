'use strict';

const ItemMenu = require('../app/models/itemMenu');
const UserType = require('../app/models/userType');
const UserTypeHasItemMenu = require('../app/models/userTypeHasItemMenu');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const myUserType = await UserType.findOne({
      where: {
        strUserType: 'Admin'
      }
    });
    const myItemsMenu = await ItemMenu.findAll();
    for (let myItemMenu of myItemsMenu) {
      let keyToRegister = (myUserType.ideUserType + '-' + myItemMenu.ideItemMenu),
          oneUserTypeHasItemMenu = await UserTypeHasItemMenu.findOne({
            where: {
              ideUserTypeHasItemMenu: keyToRegister
            }
          }
      );
      if (!oneUserTypeHasItemMenu) {
        await UserTypeHasItemMenu.create({
          ideUserTypeHasItemMenu: keyToRegister,
          ideUserType: myUserType.ideUserType,
          ideItemMenu: myItemMenu.ideItemMenu,
          timeStamp: new Date()
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblUserTypeHasItemMenu', null, {});
  }
};
