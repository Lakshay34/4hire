import { showAlert } from "./alert.js";
// const axios = require('axios');

const deleteTask = async (id) => {
  try {
    // console.log(id)
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
    showAlert("error", "Could not delete Task, Try again later");
  }
};

const deletetask = document.getElementById("DeleteTask");

var modal = document.querySelector(".modal-body");

if (deletetask) {
  deletetask.addEventListener("click", (e) => {
    var id = modal.getAttribute("value");
    deleteTask(id);
  });
}