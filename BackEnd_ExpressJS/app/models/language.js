const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Translation = require('./translation');

const Language = sequelize.define('tblLanguage', {
        ideLanguage: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        strLanguage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ideTranslation: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
              model: Translation,
              key: 'ideTranslation',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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

Language.belongsTo(Translation, { foreignKey: 'ideTranslation' });

module.exports = Language;
