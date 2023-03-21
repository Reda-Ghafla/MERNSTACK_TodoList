const { Todo } = require("../models/Todo");

const createToDo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
    });
    // res.status(201).json(todo);
    // console.log(todo);
    const result = await todo.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetchToDo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetchSingleToDo = async (req, res) => {
  // console.log(req.params);
  try {
    const singleToDo = await Todo.findById(req.params.id);
    res.status(200).json(singleToDo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateToDo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatetodoID = await Todo.findByIdAndUpdate(id, {
      title,
      description,
    }, {new : true, old : false, runValidators : true});
    res.status(200).json(updatetodoID);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteToDo = async (req, res) => {
    const { id } = req.params;
    const toDoID = await Todo.findByIdAndDelete(id);
    toDoID.save().then(() => {
        res.status(200).json("Todo deleted")
    }).catch((err) => {
        res.status(400).json({ message: err.message })
    })
}

module.exports = { createToDo, fetchToDo, fetchSingleToDo, updateToDo, deleteToDo };
