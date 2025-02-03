const express = require("express");
const passport = require("passport");

const passportService = require("../services/passport");

const protectedRoute = passport.authenticate("jwt", { session: false });
const router = express.Router();

const Car = require("../models/car");

//RESTFUL Endpoints
// GET, POST, PATCH, DELETE

const getCar = async (req, res, next) => {
  let car;
  try {
    car = await Car.findById(req.params.id);
    if (car === null) {
      return res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.car = car;
  next();
};

//GET ALL
router.get("/", protectedRoute, async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET ONE
router.get("/:id", getCar, async (req, res) => {
  res.json(res.car);
});

//POST CREATE
router.post("/", async (req, res) => {
  const car = new Car({
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
  });
  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PATCH UPDATE
router.patch("/:id", getCar, async (req, res) => {
  if (req.body.year != null) {
    res.car.year = req.body.year;
  }
  if (req.body.make != null) {
    res.car.make = req.body.make;
  }
  if (req.body.model != null) {
    res.car.model = req.body.model;
  }
  try {
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.delete("/:id", getCar, async (req, res) => {
  try {
    await res.car.deleteOne();
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
