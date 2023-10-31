const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Translation = sequelize.define('tblTranslation', {
        ideTranslation: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strTranslation: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        strLabelKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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

module.exports = Translation;
