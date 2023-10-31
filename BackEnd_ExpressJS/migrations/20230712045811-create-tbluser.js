'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('tblUser', {
            ideUser: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            strUserName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            strEmail: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('tblUser');
    }
};