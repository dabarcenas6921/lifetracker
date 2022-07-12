const express = require("express");
const User = require("../models/user");
const router = express.Router();

// define the about route
router.post("/login", async (req, res, next) => {
  try {
    //Take users username and password and attemps to authenticate them
    const user = await User.login(req.body);
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    //Take request body and attempt to make a new user
    const user = await User.register(req.body);
    console.log(req.body);
    return res.status(201).json({ user });
  } catch (e) {}
});

module.exports = router;
