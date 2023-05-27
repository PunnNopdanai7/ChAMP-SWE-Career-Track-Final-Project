const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Route files
const tasks = require("./routes/tasks");
const lists = require("./routes/lists");

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const PORT = process.env.PORT ?? "8080";
const API_HOST = process.env.API_HOST ?? "localhost";

app.use(bodyParser.json());
app.use(cookieParser());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Taks and List management API",
      version: "1.0.0",
      description: "API to manage tasks and lists",
    },
    servers: [
      {
        url: `http://${API_HOST}:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/lists", lists);

module.exports = app;
