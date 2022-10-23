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