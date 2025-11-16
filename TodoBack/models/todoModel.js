const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
