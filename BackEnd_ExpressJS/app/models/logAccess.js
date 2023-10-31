require('dotenv').config();
const sequelize = require('../config/database');
const { DataTypes, Op } = require('sequelize');
const User = require('./user');

const LogAccess = sequelize.define('tblLogAccess', {
        ideLogAccess: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        strAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        strEmail: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        strResult: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ideUser: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
              model: User,
              key: 'ideUser',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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

LogAccess.belongsTo(User, { foreignKey: 'ideUser' });

LogAccess.isBlocked = async (pIP, pEmail) =>  {
    try {
        const timeLimitInSeg = parseFloat(process.env.TIME_LIMIT_ACCESS) * 60;
        const lastMinutesAgo = new Date(Date.now() - timeLimitInSeg * 1000);
        const rowsAccess = await LogAccess.findAll({
            where: {
                [Op.and]: [
                    {
                      [Op.or]: [
                        { strAddress: pIP },
                        { strEmail: pEmail },
                      ],
                    },
                    {
                      [Op.or]: [
                        { strResult: 'Failed' },
                        { strResult: 'Blocked' },
                      ],
                    },
                    {
                      timeStamp: {
                        [Op.gte]: lastMinutesAgo,
                      },
                    },
                ],
            },
            order: [['timeStamp', 'DESC']],
        });
        if (rowsAccess && rowsAccess.length > 0) {
            if (rowsAccess[0].strResult !== 'Blocked') {
                const limitAttempts = parseInt(process.env.NUMBER_LIMIT_ACCESS);
                return rowsAccess.length >= limitAttempts;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false; 
    }
};

LogAccess.setBlocked = async (pIP, pEmail) =>  {
    try {
        await LogAccess.create({
          strAddress: pIP,
          strEmail: pEmail,
          strResult: 'Blocked',
          timeStamp: new Date(),
        });
    } catch (error) {
        console.error(error);
    }
};

LogAccess.registerAccess = async (pA, pIP, pEmail) =>  {
    let rResult = pA ? 'Success' : 'Failed';
    if (!pA) {
        const blocked = await LogAccess.isBlocked(pIP, pEmail);
        if (blocked) {
            rResult = 'Blocked';
        }
    }
    await LogAccess.create({
        strAddress: pIP,
        strEmail: pEmail,
        strResult: rResult,
        timeStamp: new Date(),
    });
    return rResult === 'Success';
};

module.exports = LogAccess;
