import { showAlert } from "./alert.js";

const apply = async (id, user) => {
    try {
        // console.log(id, user)
      const res = await axios({
        method: "PATCH",
        url: "/api/v1/tasks/acceptUser",
        data: {
            id,
            user
        }
      });
      
      if ((res.data.status == "Success")) {
        showAlert("success", "The user is accepted for this task!");
        window.setTimeout(() => {
          location.assign("/home");
        }, 600);
      }
    } catch (err) {
      // console.log(err);
      showAlert("error", "Error! Try again later.");
    }
};

const accept = document.getElementById("acceptuser");

if (accept) {
    accept.addEventListener("click", (e) => {
    var id = document.getElementById("taskId").value;
    var user = document.getElementById("userId").value;
    apply(id, user);
  });
}