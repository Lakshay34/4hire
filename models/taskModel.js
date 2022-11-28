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

  applied: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }],

  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },

  accepted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
