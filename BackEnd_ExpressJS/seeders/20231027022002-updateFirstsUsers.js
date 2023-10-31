'use strict';

const Language = require('../app/models/language');
const User = require('../app/models/user');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const myLang = await Language.findOne({
      where: {
        ideLanguage: 'es'
      }
    });
    let myUser = await User.findOne({
      where: {
        strEmail: 'karen_haide@testo.com'
      }
    });
    myUser.strDefaultLanguage = myLang.ideLanguage;
    await myUser.save();
  },

  async down (queryInterface, Sequelize) {
    let myUser = await User.findOne({
      where: {
        strEmail: 'karen_haide@testo.com'
      }
    });
    myUser.strDefaultLanguage = null;
    await myUser.save();
  }
};
