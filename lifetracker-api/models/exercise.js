const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
  static async addExercise(exercise) {
    //Adding an exercise into the database...

    //First check if all the fields are completed
    const requiredFields = [
      "exerciseName",
      "exerciseCategory",
      "duration",
      "intensity",
    ];

    requiredFields.forEach((field) => {
      if (!exercise.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
        INSERT INTO exercise(
            name,
            category,
            duration,
            intensity
        )
        VALUES ($1,$2,$3,$4)
        RETURNING id,name as exercise_name,category as exercise_category,duration,intensity;
        `,
      [
        exercise.exerciseName,
        exercise.exerciseCategory,
        exercise.duration,
        exercise.intensity,
      ]
    );
    //return the exercise
    const exerciseRow = result.rows[0];
    return exerciseRow;
  }
}

module.exports = Exercise;
