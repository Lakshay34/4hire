import { showAlert } from "./alert.js";
// const axios = require('axios');

const login = async (email, password, role) => {
  try {
    console.log(email, password, role);
    const res = await axios({
      method: "POST",
      url: "http://localhost:4001/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        if (role == "user") {
          location.assign("/home");
        }
        if (role == "admin") {
          location.assign("/adminUsers");
        }
      }, 500);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Incorrect Email or Password");
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:4001/api/v1/users/logout",
    });
    if ((res.data.status = "success")) {
      window.setTimeout(() => {
        location.assign("/");
      });
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};

const loginForm = document.getElementById("Usersubmit");
const adminlogin = document.getElementById("Adminsubmit");
const logoutBt = document.getElementById("logout");

if (logoutBt) logoutBt.addEventListener("click", logout);

if (loginForm)
  loginForm.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    login(email, password, "user");
  });

if (adminlogin)
  adminlogin.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password, "admin");
    login(email, password, "admin");
  });
