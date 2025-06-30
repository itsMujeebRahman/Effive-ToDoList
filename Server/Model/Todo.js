const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  taskName: String,
  taskComment: String,
  subTasks: [
    {
      subTaskName: String,
      subTaskDone: {
        type: Boolean,
        default: false,
      },
      subCreatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  taskDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  finishedAt: {
    type: Date,
    default: Date.now,
  },
});

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;
