const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please title is required']
    },
    description : {
        type: String,
        required: [true, 'Please description is required']
    },
}, {timestamps : true,  new: true });

const Todo  = mongoose.model('Todo', todoSchema)

module.exports = {Todo}