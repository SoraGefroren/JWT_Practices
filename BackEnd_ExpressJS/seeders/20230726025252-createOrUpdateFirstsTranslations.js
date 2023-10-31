'use strict';
/** @type {import('sequelize-cli').Migration} */
const Translation = require('../app/models/translation');

module.exports = {
  async up (queryInterface, Sequelize) {
    const aryTranslations = [
      {
        strTranslation: JSON.stringify({
          es: "Servidor ejecutándose en",
          en: "Server running on",
        }),
        strLabelKey: "serverRunningOn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "El nombre de usuario y/o contraseña es incorrecto",
          en: "The username and/or password is incorrect",
        }),
        strLabelKey: "theUsernameAndOrPasswordIsIncorrect",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Error interno del servidor",
          en: "Internal server error",
        }),
        strLabelKey: "internalServerError",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Saludos",
          en: "Greetings",
        }),
        strLabelKey: "greetings",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Token no proporcionado",
          en: "Token not provided",
        }),
        strLabelKey: "tokenNotProvided",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Token inválido",
          en: "Invalid token",
        }),
        strLabelKey: "invalidToken",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Usuario inválido",
          en: "Invalid user",
        }),
        strLabelKey: "invalidUser",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Token válido",
          en: "Valid token",
        }),
        strLabelKey: "validToken",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Su acceso fue bloqueado.\nPor favor, intenta entrar de nuevo en unos minutos",
          en: "Your access was blocked.\nPlease, try to enter again in a few minutes",
        }),
        strLabelKey: "yourAccessWasBlockedPleaseTryToEnterAgainInAFewMinutes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Ha superado el límite de intentos de acceso",
          en: "You have exceeded the limit of access attempts",
        }),
        strLabelKey: "youHaveExceededTheLimitOfAccessAttempts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Traducciones",
          en: "Translations",
        }),
        strLabelKey: "translations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Pruebas",
          en: "Tests",
        }),
        strLabelKey: "tests",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Usuario",
          en: "User",
        }),
        strLabelKey: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Contraseña",
          en: "Password",
        }),
        strLabelKey: "password",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Acceso",
          en: "Login",
        }),
        strLabelKey: "login",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Se requiere el usuario",
          en: "The user is required",
        }),
        strLabelKey: "theUserIsRequired",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "La contraseña es requerida",
          en: "The password is required",
        }),
        strLabelKey: "thePasswordIsRequired",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Cerrar sesión",
          en: "Log out",
        }),
        strLabelKey: "logOut",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Salir",
          en: "Exit",
        }),
        strLabelKey: "exit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Español",
          en: "Spanish",
        }),
        strLabelKey: "spanish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        strTranslation: JSON.stringify({
          es: "Inglés",
          en: "English",
        }),
        strLabelKey: "english",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    for (let dataTranslation of aryTranslations) {
      let oneTranslation = await Translation.findOne({
        where: {
          strLabelKey: dataTranslation.strLabelKey
        }
      });
      if (!oneTranslation) {
        await Translation.create(dataTranslation);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    // Limpiar la tabla
    await queryInterface.bulkDelete('tblTranslation', null, {});
  }
};
