const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ItemMenu = require('./itemMenu');
const UserType = require('./userType');

const UserTypeHasItemMenu = sequelize.define('tblUserTypeHasItemMenu', {
        ideUserTypeHasItemMenu: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        ideUserType: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: UserType,
              key: 'ideUserType',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        ideItemMenu: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
              model: ItemMenu,
              key: 'ideItemMenu',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        timeStamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        // Activar/Desactivar las marcas de tiempo
        timestamps: false,
        // Usar el nombre de la tabla tal como está en la base de datos
        freezeTableName: true,
    });
    
UserTypeHasItemMenu.belongsTo(ItemMenu, { foreignKey: 'ideItemMenu' });

module.exports = UserTypeHasItemMenu;
