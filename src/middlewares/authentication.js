"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const accessToken = auth ? auth.split(" ")[1] : null;

  //jwt dogrulama islemini gerceklestirmek icin asagidaki kodu yazdim.
  jwt.verify(
    accessToken,
    process.env.ACCESS_KEY,
    (err, userData) => (req.user = userData)
  );

  // Add createdID for all req.body:
  // req.body.createdId = req.user?._id;

  next();
};
