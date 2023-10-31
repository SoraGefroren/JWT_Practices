'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up (queryInterface, Sequelize) {
        // Agregar el nuevo campo 'strDefaultLanguage' a la tabla 'tblUser'
        await queryInterface.addColumn('tblUser', 'strDefaultLanguage', {
            type: Sequelize.STRING,
            defaultValue: 'en',
            allowNull: true,
        });
    },

    async down (queryInterface, Sequelize) {
        // Eliminar el campo 'strDefaultLanguage' de la tabla 'tblUser'
        await queryInterface.removeColumn('tblUser', 'strDefaultLanguage');
    }
};