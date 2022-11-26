// import { showAlert } from "../js/alert";
// const axios = require('axios');

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  
 
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const addTask = async (title, dueDate, description, postDate, id) => {
  try {
    // console.log(title, dueDate, description, postDate, id, name)
    const res = await axios({
      method: "POST",
      url: `http://localhost:4001/api/v1/tasks/`,
      data: {
        title:title, 
        dueDate:dueDate, 
        description:description, 
        postDate:postDate, 
        postedBy: id,
      }
    });
    // console.log(res)
    if (res.data.status === "Success") {
      showAlert("success", "Task Added successfully!");
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Could not Post Task");
  }
};

const addtask = document.getElementById("addTask");

if (addtask) {
  addtask.addEventListener("click", (e) => {
    e.preventDefault();
    var title = document.getElementById("title").value;
    var dueDate = document.getElementById("dueDate").value;
    var description = document.getElementById("description").value;
    var id = document.getElementById('id').getAttribute("value");
    var postDate = new Date()
    addTask(title, dueDate, description, postDate, id);
  });
}