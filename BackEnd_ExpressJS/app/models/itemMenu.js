const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Translation = require('./translation');

const ItemMenu = sequelize.define('tblItemMenu', {
        ideItemMenu: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strLink: {
            type: DataTypes.TEXT,
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

ItemMenu.belongsTo(Translation, { foreignKey: 'ideTranslation' });

module.exports = ItemMenu;
