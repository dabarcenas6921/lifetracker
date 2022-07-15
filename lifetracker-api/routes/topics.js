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
      const exerciseInfo = req.body.exerciseInfo;
      const userId = req.body.userId;
      Exercise.addExercise(exerciseInfo, userId);
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

router.get("/:topic/:userId", async (req, res, next) => {
  try {
    const topic = req.params.topic;
    const userId = req.params.userId;
    console.log(`Getting ${topic} rows from the database from user ${userId}`);
    if (topic == "exercise") {
      const exerciseData = await Exercise.getExercises(userId);
      res.status(201).json({ exerciseData: exerciseData, userId: userId });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
