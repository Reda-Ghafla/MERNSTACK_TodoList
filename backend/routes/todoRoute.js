const express = require("express");
const {
  createToDo,
  fetchToDo,
  fetchSingleToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/TodoController");
// const { Todo } = require("../models/Todo");
const router = express.Router();

router.post("/todos", createToDo);
router.get("/todos", fetchToDo);
router.get("/todos/:id", fetchSingleToDo);
router.put("/todos/:id", updateToDo);
router.delete("/todos/:id", deleteToDo);

module.exports = { router };
