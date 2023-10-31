const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserType = require('./userType');
const Language = require('./language');

const User = sequelize.define('tblUser', {
        ideUser: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strUserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        strEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        strDefaultLanguage: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Language,
                key: 'ideLanguage',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        ideUserType: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
              model: UserType,
              key: 'ideUserType',
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

User.belongsTo(UserType, { foreignKey: 'ideUserType' });

User.belongsTo(Language, { foreignKey: 'strDefaultLanguage' });

module.exports = User;
