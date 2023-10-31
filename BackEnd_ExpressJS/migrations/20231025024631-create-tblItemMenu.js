'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tblItemMenu', {
        ideItemMenu: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        strLink: {
            type: Sequelize.TEXT,
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
    await queryInterface.addConstraint('tblItemMenu', {
        fields: ['ideTranslation'],
        type: 'foreign key',
        name: 'fk_tblItemMenu_tblTranslation_ideTranslation',
        references: {
          table: 'tblTranslation',
          field: 'ideTranslation',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('tblItemMenu', 'fk_tblItemMenu_tblTranslation_ideTranslation');
      await queryInterface.dropTable('tblItemMenu');
  }
};
