"use strict";
/* -------------------------------------------------------*/
const { mongoose } = require("../config/dbConnection");
const { isEmail } = require("validator");
/* -------------------------------------------------------*
{
  "username": "deneme1",
  "password": "1234",
  "email":"test1@site.com",
  "firstName":"rent1",
  "lastName":"car1",
  "isActive":false,
  "isAdmin":false
}
/* -------------------------------------------------------*/
const passwordEncrypt = require("../helpers/passwordEncrypt");

const commonFields = {
  type: String,
  trim: true,
  required: true,
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      ...commonFields,
      unique: true,
    },

    password: {
      ...commonFields,
      set: (password) => passwordEncrypt(password),
    },

    email: {
      ...commonFields,
      unique: [true, "Your email must be unique"],
      validate: [isEmail, "You must enter a valid email"],
    },

    firstName: { ...commonFields },
    lastName: { ...commonFields },

    phoneNumber: {
      type: Number,
      // required: true,
      //   unique:true
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
