import { showAlert } from "./alert.js";

export const updateSettings = async (form) => {
  try {
    console.log(name, email, passwordCurrent, password, passwordConfirm);
    const res = await axios.all([
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updateDetails",
        data: {
          form
        },
      }),
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updatePassword",
        data: {
          form
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

const update = document.querySelector(".vh-100");

if (update)
  update.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append( 'name', document.getElementById("name").value);
    form.append( 'email', document.getElementById("email").value);
    form.append( 'skills', document.getElementById("skills").value.split(","));
    form.append( 'language', document.getElementById("language").value.split(","));
    form.append( 'description', document.getElementById("description").value);
    form.append( 'photo', document.getElementById("photo").files[0]);
    form.append( 'cv', document.getElementById("cv").files[0]);
    form.append( 'passwordCurrent', document.getElementById("currentpassword").value);
    form.append( 'password', document.getElementById("newpassword").value);
    form.append( 'passwordConfirm',  document.getElementById("confirmpassword").value);

    updateSettings(form);
  });
