require('dotenv').config();

module.exports = {
    dialect: 'mysql', // In SQL Server -> 'mssql',
    dialectOptions: {
      // SQL Server
      // -----------------------------------------
      // options: {
      //   // Usar autenticación de Windows, si es un entorno Windows
      //   trustedConnection: true,
      //   // Usar para no validar el certificado HTTPS
      //   trustServerCertificate: (process.env.NODE_ENV !== 'production')
      // },
      // -----------------------------------------
      // Usar para no validar el certificado HTTPS
      insecureAuth: true
    },
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}