const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserTypeHasItemMenu = require('./userTypeHasItemMenu');

const UserType = sequelize.define('tblUserType', {
        ideUserType: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strUserType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        // Activar/Desactivar las marcas de tiempo
        timestamps: true,
        // Usar el nombre de la tabla tal como está en la base de datos
        freezeTableName: true,
    });
    
UserType.hasMany(UserTypeHasItemMenu, { foreignKey: 'ideUserType' });

module.exports = UserType;
