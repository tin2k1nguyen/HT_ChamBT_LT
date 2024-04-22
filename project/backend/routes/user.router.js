// router user
const express = require("express");
const { checkLogin } = require("../middlewares");
const UserModel = require("../models/user.server.model");

const router = express.Router();

// login
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user == null) {
      return res.status(400).json({ message: "Cannot find user" });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      if (isMatch) {
        return res.status(200).json({
          message: "Login successfully",
          accessToken: user.generateAuthToken(),
        });
      }
      return res.status(400).json({ message: "Wrong password" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all user
router.get("/", checkLogin, async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// load current user
router.get("/me", checkLogin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get user by id
router.get("/:id", checkLogin, getUser, (req, res) => {
  res.json(res.user);
});

// setup endpoint create user
router.post("/signup", async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update user
router.patch("/:id", checkLogin, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.roles != null) {
    res.user.roles = req.body.roles;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete user
router.delete("/:id", checkLogin, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware get user by id
async function getUser(req, res, next) {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
