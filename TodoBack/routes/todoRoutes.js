const express = require("express");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTaskStatus,
} = require("../controllers/todoController");
const { authenticatorToken } = require("../middleware/authenticator");

const router = express.Router();

router.get("/", authenticatorToken, getAllTodos);
router.get("/:id", authenticatorToken, getTodoById); 
router.post("/", authenticatorToken, createTodo); 
router.put("/:id", authenticatorToken, updateTodo); 
router.delete("/:id", authenticatorToken, deleteTodo); 
router.put("/:id", authenticatorToken, updateTaskStatus);
module.exports = router;
