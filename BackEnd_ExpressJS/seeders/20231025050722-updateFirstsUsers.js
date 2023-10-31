'use strict';

const User = require('../app/models/user');
const UserType = require('../app/models/userType');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const myUserType = await UserType.findOne({
      where: {
        strUserType: 'Admin'
      }
    });
    let myUser = await User.findOne({
      where: {
        strEmail: 'karen_haide@testo.com'
      }
    });
    myUser.ideUserType = myUserType.ideUserType;
    await myUser.save();
  },

  async down (queryInterface, Sequelize) {
    let myUser = await User.findOne({
      where: {
        strEmail: 'karen_haide@testo.com'
      }
    });
    myUser.ideUserType = null;
    await myUser.save();
  }
};
