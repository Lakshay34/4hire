import { showAlert } from "./alert.js";

export const updateSettings = async (
  name,
  email,
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    console.log(name, email, passwordCurrent, password, passwordConfirm);
    const res = await axios.all([
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updateDetails",
        data: {
          name,
          email,
        },
      }),
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updatePassword",
        data: {
          passwordCurrent,
          password,
          passwordConfirm,
        },
      }),
    ]);

    if (res[0].data.status === "success" && res[1].data.status === "success") {
      showAlert("success", "Data updated successfully!");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    // showAlert('error', err.response.data)
    console.log(err);
  }
};

const update = document.getElementById("update");

if (update)
  update.addEventListener("click", (e) => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var passwordCurrent = document.getElementById("currentpassword").value;
    var password = document.getElementById("newpassword").value;
    var passwordConfirm = document.getElementById("confirmpassword").value;

    updateSettings(name, email, passwordCurrent, password, passwordConfirm);
  });
