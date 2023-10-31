'use strict';

const ItemMenu = require('../app/models/itemMenu');
const Translation = require('../app/models/translation');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const myTranslation01 = await Translation.findOne({
      where: {
        strLabelKey: 'tests'
      }
    });
    const myTranslation02 = await Translation.findOne({
      where: {
        strLabelKey: 'translations'
      }
    });
    const aryItemsMenu = [
      {
        ideTranslation: myTranslation01.ideTranslation,
        strLink: '/tests',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ideTranslation: myTranslation02.ideTranslation,
        strLink: '/translations',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];    
    for (let dataItemMenu of aryItemsMenu) {
      let oneItemMenu = await ItemMenu.findOne({
        where: {
          strLink: dataItemMenu.strLink
        }
      });
      if (!oneItemMenu) {
        await ItemMenu.create(dataItemMenu);
      }
    }
  },
  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblItemMenu', null, {});
  }
};
