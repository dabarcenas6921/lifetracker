const express = require("express");
const Exercise = require("../models/exercise");
const Nutrition = require("../models/nutrition");
const Sleep = require("../models/sleep");
const security = require("../middleware/security");
const router = express.Router();

router.post("/:topic", (req, res, next) => {
  try {
    const topic = req.params.topic; //gets the topic from the parameters
    console.log(`Posting into the ${topic} database..`);
    if (topic == "exercise") {
      //Taking the posted exerciseInfo object and inputting it into our database.
      const exerciseInfo = req.body;
      Exercise.addExercise(exerciseInfo);
      return res.status(201).json(req.body);
    }
    if (topic == "nutrition") {
      const nutritionInfo = req.body;
      Nutrition.addNutrition(nutritionInfo);
    }
    if (topic == "sleep") {
      const sleepInfo = req.body;
      Sleep.addSleep(sleepInfo);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:topic", async (req, res, next) => {
  try {
    const topic = req.params.topic;
    console.log(`Getting ${topic} rows from the database...`);
    if (topic == "exercise") {
      const exerciseData = await Exercise.getExercises();
      res.status(201).json({ exerciseData: exerciseData });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
