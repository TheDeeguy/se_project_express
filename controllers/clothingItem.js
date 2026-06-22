const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ error: err.message });
      }
      res
        .status(500)
        .send({ message: "Error from createItem", error: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to load items" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail(new Error("Item not found"))
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ error: "Invalid item ID format" });
      }
      if (err.message === "Item not found") {
        return res.status(404).send({ error: "Item not found" });
      }
      res.status(500).send({ error: "Failed to delete item" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Item not found"))
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ error: "Invalid item ID format" });
      }
      if (err.message === "Item not found") {
        return res.status(404).send({ error: "Item not found" });
      }
      res.status(500).send({ error: "Failed to like item" });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Item not found"))
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ error: "Invalid item ID format" });
      }
      if (err.message === "Item not found") {
        return res.status(404).send({ error: "Item not found" });
      }
      res.status(500).send({ error: "Failed to unlike item" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
