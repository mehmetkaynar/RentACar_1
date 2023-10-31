"use strict";

const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");

const User = require("../models/user.model");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.errorStatusCode = 401;
      throw new Error("Please enter username and password");
    }
    const user = await User.findOne({ username, password }).select("+password"); // mongoose default olarak hassas verilerin password gibi donmesine izin vermez.Ama select('+password) ile bunu donduruyoruz.
    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("Invalid username or password. Please try again.");
    }
    if (!user.isActive) {
      res.errorStatusCode = 401;
      throw new Error("This account is not active");
    }
    res.send({
      error: false,
      token: setToken(user),
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh;

    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async function (err, userData) {
          if (!err) {
            const { _id, password } = userData;

            if (!(_id && password)) {
              res.errorStatusCode = 401;
              throw new Error("Please enter id and password");
            }

            const user = await User.findOne({ _id });
            if (!(user && user.password == password)) {
              res.errorStatusCode = 401;
              throw new Error("Wrong id or password.");
            }

            if (!user.isActive) {
              res.errorStatusCode = 401;
              throw new Error("This account is not active.");
            }
            res.send({
              error: false,
              token: setToken(user, true),
            });
          } else {
            res.errorStatusCode = 401;
            throw err;
          }
        }
      );
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh");
    }
  },

  logout: async (req, res) => {
    res.send({
      error: false,
      message:
        "No need any doing for logout. You must deleted Bearer Token from your browser.",
    });
  },
};
