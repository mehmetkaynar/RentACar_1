"use strict";
/* -------------------------------------------------------*/
const { mongoose } = require("../config/dbConnection");

/* -------------------------------------------------------*

{
  "plateNumber":"34 TR 0000",
  "brand":"Tesla",
  "model":"2022",
  "year": "2020",
  "createdId": ""

}

/* -------------------------------------------------------*/

const commonFields = {
  type: String,
  trim: true,
  required: true,
};

const commonField = {
  type: Number,
  trim: true,
  required: true,
};

const CarSchema = new mongoose.Schema(
  {
    plateNumber: {
      ...commonFields,
      unique: true,
    },

    brand: { ...commonFields },

    model: { ...commonFields },

    year: { ...commonField },

    pricePerDay: { type: Number, default: 100, required: true },

    available: { type: Boolean, default: true },

    transmission: {
      type: String,
      enum: ["Automatic", "Manual", "Semi-Automatic"],
    },

    fuelType: {
      type: String,
      enum: ["Gasoline", "Diesel", "Electric", "Hybird"],
    },

    imageUrl: { type: String, trim: true },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "cars",
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", CarSchema);
