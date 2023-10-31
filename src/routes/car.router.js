"use strict";

/*------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { isLogin, isAdmin } = require("../middlewares/permissions");
const car = require("../controllers/car.controller");

// URl: /cars

// router.use(isAdmin);

router.route("/").get(isLogin, car.list).post(car.create);

router
  .route("/:id")
  .get(car.read)
  .put(car.update)
  .patch(car.update)
  .delete(car.delete);

/* ------------------------------------------------------- */
module.exports = router;
