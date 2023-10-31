'use strict';

const Language = require('../app/models/language');
const Translation = require('../app/models/translation');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const myTranslationEnglish = await Translation.findOne({
      where: {
        strLabelKey: 'english'
      }
    });
    const myTranslationSpanish = await Translation.findOne({
      where: {
        strLabelKey: 'spanish'
      }
    });
    const aryLangs = [
      {
        ideLanguage: 'en',
        strLanguage: 'English',
        ideTranslation: myTranslationEnglish? myTranslationEnglish.ideTranslation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ideLanguage: 'es',
        strLanguage: 'Español',
        ideTranslation: myTranslationSpanish? myTranslationSpanish.ideTranslation: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    for (let dataLang of aryLangs) {
      let oneLang = await Language.findOne({
        where: {
          ideLanguage: dataLang.ideLanguage
        }
      });
      if (!oneLang) {
        await Language.create(dataLang);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblLanguage', null, {});
  }
};
