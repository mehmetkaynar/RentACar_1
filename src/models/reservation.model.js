"use strict";
/* -------------------------------------------------------*/
const { mongoose } = require("../config/dbConnection");

/* -------------------------------------------------------*
{
  "carId": "",
  "userId":"",
  "startDate":"22.10.2023",
  "endDate":"25.10.2023",
  "dateOfBirth": "25.01.1993",
  "createdId": ""
}

/* -------------------------------------------------------*/

const Car = require("./car.model");

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

const ReservationSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const dateOfBirth = new Date(value);
          const currentDate = new Date();
          const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
          return age > 18;
        },
        message:
          "You cannot make a reservation because you are under 18 years old.",
      },
    },

    totalPrice: {
      type: Number,
      default: async function () {
        if (this.carId) {
          const car = await Car.findById(this.carId),
            pricePerDay = car.pricePerDay,
            startDate = new Date(this.startDate),
            endDate = new Date(this.endDate),
            days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
          // console.log("pricePerDay", pricePerDay);

          return pricePerDay * days;
        } else {
          return 0;
        }
      },
    },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
