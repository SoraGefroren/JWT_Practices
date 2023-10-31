'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tblUserTypeHasItemMenu', {
        ideUserTypeHasItemMenu: {
            type: Sequelize.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false,
        },
        ideUserType: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: 'tblUserType',
              key: 'ideUserType',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        ideItemMenu: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: 'tblItemMenu',
              key: 'ideItemMenu',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        timeStamp: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    });

    await queryInterface.addConstraint('tblUserTypeHasItemMenu', {
        fields: ['ideUserType'],
        type: 'foreign key',
        name: 'fk_tblUserTypeHasItemMenu_tblUserType_ideUserType',
        references: {
          table: 'tblUserType',
          field: 'ideUserType',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('tblUserTypeHasItemMenu', {
        fields: ['ideItemMenu'],
        type: 'foreign key',
        name: 'fk_tblUserTypeHasItemMenu_tblItemMenu_ideItemMenu',
        references: {
          table: 'tblItemMenu',
          field: 'ideItemMenu',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('tblUserTypeHasItemMenu', 'fk_tblUserTypeHasItemMenu_tblUserType_ideUserType');
      await queryInterface.removeConstraint('tblUserTypeHasItemMenu', 'fk_tblUserTypeHasItemMenu_tblItemMenu_ideItemMenu');
      await queryInterface.dropTable('tblUserTypeHasItemMenu');
  }
};
