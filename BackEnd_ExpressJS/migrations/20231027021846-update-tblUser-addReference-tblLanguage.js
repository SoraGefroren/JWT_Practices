'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tblUser', 'strDefaultLanguage');
    await queryInterface.addColumn('tblUser', 'strDefaultLanguage', {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
      references: {
          model: 'tblLanguage',
          key: 'ideLanguage',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('tblUser', {
      fields: ['strDefaultLanguage'],
      type: 'foreign key',
      name: 'fk_tblUser_tblLanguage_ideLanguage',
      references: {
        table: 'tblLanguage',
        field: 'ideLanguage',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tblUser', 'fk_tblUser_tblLanguage_ideLanguage');
    await queryInterface.removeColumn('tblUser', 'strDefaultLanguage');
    await queryInterface.addColumn('tblUser', 'strDefaultLanguage', {
      type: Sequelize.STRING,
      defaultValue: 'en',
      allowNull: true,
    });
  }
};
