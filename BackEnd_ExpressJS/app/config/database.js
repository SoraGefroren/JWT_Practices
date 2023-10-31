const dbConfig = require('./dbConfig');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(dbConfig);

/*
const sql = require('mssql');
module.exports = async () => {
    let conn = null;
    try {
        conn = await sql.connect({
            server: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            options: {
                // Usar autenticación de Windows, si es un entorno Windows
                trustedConnection: true,
                // Usar para no validar el certificado HTTPS
                trustServerCertificate: (process.env.NODE_ENV !== 'production')
            }
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
    return conn;
};
*/