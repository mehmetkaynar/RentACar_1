"use strict";

/*------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// URL: /

//auth
router.use("/auth", require("./auth.router"));
//users
router.use("/users", require("./user.router"));
//cars
router.use("/cars", require("./car.router"));
//reservations
router.use("/reservations", require("./reservation.router"));

/* ------------------------------------------------------- */
module.exports = router;
