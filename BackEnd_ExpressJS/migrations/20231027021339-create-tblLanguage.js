'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tblLanguage', {
        ideLanguage: {
            type: Sequelize.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false,
        },
        strLanguage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ideTranslation: {
            type: Sequelize.BIGINT,
            allowNull: true,
            references: {
              model: 'tblTranslation',
              key: 'ideTranslation',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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
    await queryInterface.addConstraint('tblLanguage', {
      fields: ['ideTranslation'],
      type: 'foreign key',
      name: 'fk_tblLanguage_tblTranslation_ideTranslation',
      references: {
        table: 'tblTranslation',
        field: 'ideTranslation',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('tblLanguage', 'fk_tblLanguage_tblTranslation_ideTranslation');
      await queryInterface.dropTable('tblLanguage');
  }
};
