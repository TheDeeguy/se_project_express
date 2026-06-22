const router = require("express").Router();
const itemRouter = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
