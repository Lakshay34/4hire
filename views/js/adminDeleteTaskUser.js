import { showAlert } from "./alert.js";
// const axios = require('axios');

const deleteTask = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:4001/api/v1/tasks/${id}`,
    });
    // console.log(res);
    if (res.data.status === "Success") {
      showAlert("success", "Task Deleted successfully!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Could not delete Task");
  }
};

const deleteUser = async (id) => {
  try {
    // console.log(id);
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:4001/api/v1/users/${id}`,
    });
    if ((res.data.status = "success")) {
      showAlert("success", "User Deleted successfully!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Could not delete User");
  }
};

const deletetask = document.getElementById("DeleteTask");
const deleteuser = document.getElementById("deleteuser");
var modal = document.querySelector(".modal-body");

if (deletetask) {
  deletetask.addEventListener("click", (e) => {
    var id = modal.getAttribute("value");
    deleteTask(id);
  });
}

if (deleteuser) {
  deleteuser.addEventListener("click", (e) => {
    var id = modal.getAttribute("value");
    deleteUser(id);
  });
}
