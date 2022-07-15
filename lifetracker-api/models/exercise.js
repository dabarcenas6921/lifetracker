const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
  static async addExercise(exercise, userId) {
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

    //Check for userId

    if (!userId) {
      throw new BadRequestError("Missing userId in the request body.");
    }

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
        INSERT INTO exercise(
            name,
            category,
            duration,
            intensity,
            user_id
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,name as exercise_name,category as exercise_category,duration,intensity,user_id;
        `,
      [
        exercise.exerciseName,
        exercise.exerciseCategory,
        exercise.duration,
        exercise.intensity,
        userId,
      ]
    );
    //return the exercise
    const exerciseRow = result.rows[0];
    return exerciseRow;
  }

  static async getExercises(userId) {
    const result = await db.query(
      `
      SELECT * 
      FROM exercise
      WHERE user_id = $1;
      `,
      [userId]
    );
    return result.rows;
  }
}

module.exports = Exercise;
