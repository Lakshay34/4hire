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
  const tasks = await Task.find();
 
  res.render("user/userHomepage", {
    user: req.user,
    tasks
  });
});

exports.getTask = (req, res) => {
  res.render("user/userTaskpage");
};

exports.getEditUser = (req, res) => {
  res.render("user/editUserProfile");
};

exports.getprofile = (req, res) => {
  res.render("user/userProfile");
};

exports.getprofileofappliedusers = (req, res) => {
  res.render("user/applieduser");
};




// Admin Pages

exports.getAdminLogin = (req, res) => {
  res.render("admin/adminlogin");
};

exports.getAdminProfile = (req, res) => {
  res.render("admin/adminprofile");
};

exports.getAdminTask = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();
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
