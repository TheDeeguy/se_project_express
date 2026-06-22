const User = require("../models/user");

// GET users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to load users" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log(name, avatar);
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ error: err.message });
      }
      res.status(500).send({ error: "Failed to create user" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error("User not found"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ error: "Invalid user ID format" });
      }
      if (err.message === "User not found") {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(500).send({ error: "Failed to load user" });
    });
};

module.exports = { getUsers, createUser, getUser };
