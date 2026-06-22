const User = require("../models/user");

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = { createUser };
