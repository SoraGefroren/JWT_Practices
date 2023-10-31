'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('tblLogAccess', {
            ideLogAccess: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            strAddress: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            strEmail: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            strResult: {
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

        await queryInterface.addConstraint('tblLogAccess', {
            fields: ['ideUser'],
            type: 'foreign key',
            name: 'fk_tblLogAccess_tblUser_ideUser',
            references: {
              table: 'tblUser',
              field: 'ideUser',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeConstraint('tblLogAccess', 'fk_tblLogAccess_tblUser_ideUser');
        await queryInterface.dropTable('tblLogAccess');
    }
};