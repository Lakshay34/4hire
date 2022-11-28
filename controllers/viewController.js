const User = require("./../models/userModel");
const Task = require("./../models/taskModel");
const AppError = require("./../utils/appError");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require("./../utils/catchAcync");

const path = require("path");
const { nextTick } = require("process");

// Outer Pages
exports.getlandingpage = (req, res) => {
  res.render("landingpage");
};

exports.getregisterForm = (req, res) => {
  res.render("register");
};

exports.getforgotPass = (req, res) => {
  res.render("forgotpass");
};

exports.getloginForm = (req, res) => {
  res.render("login");
};

// User Pages
exports.getHome = catchAsync(async(req, res) => {
  const tasks = await Task.aggregate([
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'postedBy', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }
  ]);
  // console.log(tasks)
  res.render("user/userHomepage", {
    user: req.user,
     tasks: tasks.reverse()
  });
});

exports.getTask = catchAsync(async(req, res) => {
  const tasks = await Task.find({ "postedBy":req.user.id })
  res.render("user/userTaskpage", {
    user: req.user,
    tasks: tasks.reverse()
  });
});

exports.getEditUser = (req, res) => {
  res.render("user/editUserProfile", {
    user: req.user
  });
};

exports.getAddTask = catchAsync(async(req, res) => {
  res.render("user/addTask", {
    user : req.user,
  });
});

exports.getEditTask = catchAsync(async(req, res) => {
  const task = await Task.findById(req.query.id)
  res.render("user/editTask", {
    task,
    user: req.user
  });
});

exports.getprofile = catchAsync(async(req, res) => {
  const usertask = await Task.find({"postedBy":req.user.id})
  const acceptedtask = await Task.find({"accepted":req.user.id})
  res.render("user/userProfile", {
    user: req.user,
    usertask,
    acceptedtask
  })
});

exports.getprofileofapplieduser = (req, res) => {
  res.render("user/appliedUser", {
    user: req.user
  });
};




// Admin Pages

exports.getAdminLogin = (req, res) => {
  res.render("admin/adminlogin");
};

exports.getAdminProfile = (req, res) => {
  res.render("admin/adminprofile");
};

exports.getAdminTask = catchAsync(async (req, res, next) => {
  const tasks = await Task.aggregate([
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'postedBy', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }
  ]);
  res.status(200).render("admin/adminTasks", {
    tasks,
  });
});

exports.getAdminUser = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).render("admin/adminUsers", {
    users,
  });
});
