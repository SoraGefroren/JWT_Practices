'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('tblLogError', {
            ideLogError: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            strAddress: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            strAppOrigin: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            strParameters: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            strError: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            ideUser: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                  model: 'tblUser',
                  key: 'ideUser',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            timeStamp: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.addConstraint('tblLogError', {
            fields: ['ideUser'],
            type: 'foreign key',
            name: 'fk_tblLogError_tblUser_ideUser',
            references: {
              table: 'tblUser',
              field: 'ideUser',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeConstraint('tblLogError', 'fk_tblLogError_tblUser_ideUser');
        await queryInterface.dropTable('tblLogError');
    }
};