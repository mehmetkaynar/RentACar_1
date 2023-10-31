"use strict";

/*------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { isLogin, isAdmin } = require("../middlewares/permissions");
const reservation = require("../controllers/reservation.controller");

// URl: /reservations

router
  .route("/")
  .get(isLogin, reservation.list)
  .post(isLogin, reservation.create);

router
  .route("/:id")
  .get(isLogin, reservation.read)
  .put(isAdmin, reservation.update)
  .patch(isAdmin, reservation.update)
  .delete(isAdmin, reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
