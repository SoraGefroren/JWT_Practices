'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('tblTranslation', {
            ideTranslation: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            strTranslation: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            strLabelKey: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('tblTranslation');
    }
};