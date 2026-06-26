const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
app.use(express.json());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = {
    _id: "689a9030e7d3d166a6e97f46",
  };

  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
