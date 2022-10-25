const path = require("path");

exports.getlandingpage = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "landingpage.html"));
  };

exports.getregisterForm = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "register.html"));
};

exports.getloginForm = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "login.html"));
};

exports.getprofile = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "profile.html"));
};

exports.getforgotPass = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "forgotpass.html"));
};

exports.getforgotPass2 = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "forgotpass2.html"));
};

exports.getforgotPassSuccess = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "forgotpassSuccess.html"));
};