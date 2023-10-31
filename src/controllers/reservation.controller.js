"use strict";

const Reservation = require("../models/reservation.model");
const Car = require("../models/car.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Reservation);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    try {
      const { carId, userId, startDate, endDate, dateOfBirth, createdId } =
        req.body;

      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      const startDateObj = new Date(startDate),
        endDateObj = new Date(endDate),
        days = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)),
        totalPrice = car.pricePerDay * days;

      const newReservation = new Reservation({
        carId,
        userId,
        startDate,
        endDate,
        dateOfBirth,
        totalPrice,
        createdId,
      });

      const data = await newReservation.save();

      res.status(201).send({
        error: false,
        data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating reservation", error });
    }
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
