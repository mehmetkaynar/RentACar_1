"use strict";

/*------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const permissons = require("../middlewares/permissions");
const user = require("../controllers/user.controller");

// URl: /users

// router.use(permissons.isAdmin);

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

/* ------------------------------------------------------- */
module.exports = router;
