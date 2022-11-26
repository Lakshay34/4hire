import { showAlert } from "./alert.js";

export const updateSettings = async (form, passwordCurrent, password, passwordConfirm) => {
  try {
    
      // for (const value of form.values()) {
      //   console.log(value);
      // }
  
    const res = await axios.all([
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updateDetails",
        data: form
      }),
      axios({
        method: "PATCH",
        url: "http://localhost:4001/api/v1/users/updatePassword",
        data: {
          passwordCurrent, 
          password, 
          passwordConfirm
        },
      }),
    ]);

    if (res[0].data.status === "success" && res[1].data.status === "success") {
      showAlert("success", "Data updated successfully!");
      window.setTimeout(() => {
        location.assign('/profile');
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data)
    
  }
};

const update = document.getElementById("submit");

if (update)
  update.addEventListener("click", (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append( 'name', document.getElementById("name").value);
    form.append( 'email', document.getElementById("email").value);
    form.append( 'address', document.getElementById("address").value);
    form.append( 'skills', document.getElementById("skills").value.split(","));
    form.append( 'language', document.getElementById("language").value.split(","));
    form.append( 'description', document.getElementById("description").value);
    form.append( 'photo', document.getElementById("photo").files[0]);
    form.append( 'cv', document.getElementById("cv").files[0]);
    var passwordCurrent = document.getElementById("passwordCurrent").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirm").value;

    updateSettings(form, passwordCurrent, password, passwordConfirm);
  });
