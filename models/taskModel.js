const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter title"],
  },

  description: {
    type: String,
    required: [true, "Enter description"],
  },

  postDate: {
    type: String,
  },

  dueDate: {
    type: String,
  },

  report: {
    type: Boolean,
    default: false,
  },

  applied: {
    type: String,
    enum: [],
  },

  postedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
