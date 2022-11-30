import { showAlert } from "./alert.js";

const apply = async (id, user) => {
    try {
      console.log(id)
      const res = await axios({
        method: "PATCH",
        url: "http://127.0.0.1:4001/api/v1/tasks/applyforTask",
        data: {
            id,
            user
        }
      });
      
      if ((res.data.status = "success")) {
        showAlert("success", "Successfully applied for this task!");
        window.setTimeout(() => {
          location.assign("/home");
        }, 600);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", "Error applying! Try again.");
    }
};

const applyfortask = document.getElementById("apply");

var modal = document.getElementById("ID");
var modal2 = document.getElementById("user");

if (applyfortask) {
    applyfortask.addEventListener("click", (e) => {
    var id = modal.getAttribute("value");
    var user = modal2.getAttribute("value");
    apply(id, user);
  });
}