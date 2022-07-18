const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Sleep {
  static async addSleep(sleep, userId) {
    //Adding sleep into the database

    //First check if all the fields are completed
    const requiredFields = ["startDate", "endDate"];

    requiredFields.forEach((field) => {
      if (!sleep.hasOwnProperty(field)) {
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
        INSERT INTO sleep(
            startDate,
            endDate,
            user_id
        )
        VALUES ($1,$2,$3)
        RETURNING id, startDate, endDate, user_id;
        `,
      [sleep.startDate, sleep.endDate, userId]
    );
    //return the exercise
    const sleepRow = result.rows[0];
    return sleepRow;
  }

  static async getSleep(userId) {
    const result = await db.query(
      `
      SELECT
       id,
       startDate,
       endDate,
       created_at 
      FROM sleep
      WHERE user_id = $1;
      `,
      [userId]
    );
    return result.rows;
  }
}

module.exports = Sleep;
