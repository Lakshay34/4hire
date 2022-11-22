const User = require('./../models/userModel')
const Task = require('./../models/taskModel')
const AppError = require('./../utils/appError')

const path = require("path");

exports.getlandingpage = (req, res) => {
    res.render("landingpage");
  };

exports.getregisterForm = (req, res) => {
    res.render("register");
};

exports.getloginForm = (req, res) => {
    res.render("login");
};

exports.getprofile = (req, res) => {
    res.render("profile");
};

exports.getforgotPass = (req, res) => {
    res.render("forgotpass");
};


exports.getAdminLogin = (req, res) => {
    res.render('adminlogin');
};

exports.getAdminProfile = (req, res) => {
    res.render("adminprofile");
};

exports.getAdminTask = (req, res) => {
    res.render("adminTasks");
};

exports.getAdminUser = (req, res) => {
    res.render("adminUsers");
};