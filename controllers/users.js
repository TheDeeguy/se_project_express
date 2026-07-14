const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");
const User = require("../models/user");

// GET users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "Failed to load users",
      });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: err.message,
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "Failed to create user",
      });
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error("User not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid user ID format",
        });
      }

      if (err.message === "User not found") {
        return res.status(NOT_FOUND).send({
          message: "User not found",
        });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "Failed to load user",
      });
    });
};

module.exports = { getUsers, createUser, getUser };
