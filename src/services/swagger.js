const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PaySphere API",
      version: "1.0.0",
      description: "Backend-only fintech system with ledger-based transactions",
    },
    servers: [
      {
        url: "https://paysphere-ih0s.onrender.com/",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
  },
  apis: ["./src/routes/*.js"], 
};

module.exports = swaggerJSDoc(options);