const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// CRUD

// Get all items
router.get("/", getItems);

// Create item
router.post("/", createItem);

// Delete item by ID
router.delete("/:itemId", deleteItem);

// Like item
router.put("/:itemId/likes", likeItem);

// Unlike item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
