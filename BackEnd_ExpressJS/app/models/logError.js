const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('./user');

const LogError = sequelize.define('tblLogError', {
        ideLogError: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        strAppOrigin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        strParameters: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        strError: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ideUser: {
            type: DataTypes.BIGINT,
            allowNull: true,
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

LogError.belongsTo(User, { foreignKey: 'ideUser' });

module.exports = LogError;
