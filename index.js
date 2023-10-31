"use strict";
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

/* ------------------------------------------------------- */

//envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8080;

//asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

// Connect DB
const { dbConnection } = require("./src/config/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Midllewares:

// Gelen verileri JSON formatinda analiz etmek icin
app.use(express.json());

//Authentication:
app.use(require("./src/middlewares/authentication"));

//Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to RENT A CAR API",
    documents: "/documents",
    user: req.user,
  });
});

// All.router.js
app.use(require("./src/routes/all.router"));

/* ------------------------------------------------------- */

//errorHandler:
app.use(require("./src/middlewares/errorHandler"));

//RUN SERVER:

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// require('./src/helpers/sync')()
