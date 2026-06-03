const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path"); 

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
        url: "https://paysphere-ih0s.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
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
  apis: [path.join(__dirname, "../routes/*.js")], // ✅ only change
};

module.exports = swaggerJSDoc(options);