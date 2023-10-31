'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    // Agregar el nuevo campo 'ideUserType' a la tabla 'tblUser'
    await queryInterface.addColumn('tblUser', 'ideUserType', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'tblUserType',
        key: 'ideUserType',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addConstraint('tblUser', {
      fields: ['ideUserType'],
      type: 'foreign key',
      name: 'fk_tblUser_tblUserType_ideUserType',
      references: {
        table: 'tblUserType',
        field: 'ideUserType',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    // Eliminar el campo 'ideUserType' de la tabla 'tblUser'
    await queryInterface.removeConstraint('tblLogError', 'fk_tblUser_tblUserType_ideUserType');
    await queryInterface.removeColumn('tblUser', 'ideUserType');
  }
};
