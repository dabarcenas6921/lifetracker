const express = require("express");
const User = require("../models/user");
const security = require("../middleware/security");
const { createUserJwt } = require("../utils/tokens");
const router = express.Router();

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    console.log(res.locals.user);
    const user = res.locals.user;
    // const user = await User.fetchUserByUsername(username);
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

// define the about route
router.post("/login", async (req, res, next) => {
  try {
    //Take users username and password and attemps to authenticate them
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user: user, token: token });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    //Take request body and attempt to make a new user
    const user = await User.register({ ...req.body, isAdmin: false });
    console.log(req.body);
    //Make a new token for the registered user
    const token = createUserJwt(user);
    console.log(token);
    return res.status(201).json({ user: user, token: token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
