const User = require('./../models/userModel')
const Task = require('./../models/taskModel')
const AppError = require('./../utils/appError')
const catchAsync = require('./../utils/catchAcync');

const path = require("path");
const { nextTick } = require('process');

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

exports.getAdminTask = catchAsync(async(req, res, next) => {
    const tasks = await Task.find();
    res.status(200).render('adminTasks', {
        tasks
    })
    
});

exports.getAdminUser = (req, res) => {
    res.render("adminUsers");
};