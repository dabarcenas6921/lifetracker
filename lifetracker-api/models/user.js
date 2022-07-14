const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
    };
  }

  static async login(credentials) {
    //These next few lines of code check if the credentials have a filled outusername or password field.
    //if there isn't, throw an error.
    const requiredFields = ["username", "password"];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Now that we have checked the fields, we're going to check if that user's email is in the database.

    const user = await User.fetchUserByUsername(credentials.username);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password); //If the input password = the hashed password in the database, return true.
      if (isValid) {
        return User.makePublicUser(user); //makes a public user.
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register(credentials) {
    //user should submit their email and pw
    //If any of these fields are missing, throw an error
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "username",
      "password",
    ];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body...`);
      }
    });

    //make sure no user already exists in the database with that email
    //if one does, throw an error
    const existingUser = await User.fetchUserByUsername(credentials.username);
    if (existingUser) {
      throw new BadRequestError("Duplicate username: ", credentials.username);
    }
    //take the user's password and hash it
    //take hte user's email and username and lowercase it
    const lowercasedEmail = credentials.email.toLowerCase();
    const lowercasedUsername = credentials.username.toLowerCase();
    //create a new user with in the db with their info
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    //Inserting the user data into the database.
    const result = await db.query(
      `
      INSERT INTO users(
          first_name,
          last_name,
          email,
          username,
          password
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING id,first_name,last_name,email,username,password,created_at,updated_at;
      `,
      [
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        lowercasedUsername,
        hashedPassword,
      ]
    );
    //return the user
    const user = result.rows[0];
    return user;
  }

  static async fetchUserByUsername(username) {
    //If no username is provided, throw an error
    if (!username) {
      throw new BadRequestError("No username provided");
    }
    //If a user is provided, SELECT from the database where the input username is equal to a username in the database
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await db.query(query, [username.toLowerCase()]); //Gets the row where the username is stored.
    const user = result.rows[0]; //Returns the first row.
    return user;
  }
}

module.exports = User;
