import { showAlert } from './alert.js'
// import axios from 'axios';

const register = async (name, email, password, passwordConfirm, JoinDate) => {
    try {
      // console.log(name, email, password, passwordConfirm, JoinDate)
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        data: {
          name,
          email,
          password,
          passwordConfirm,
          JoinDate
        }
      });
      if (res.data.status === 'success') {
        showAlert('success', 'Account created successfully!');
        window.setTimeout(() => {
          location.assign('/login');
        }, 500);
      }
    } catch (err) {
      showAlert('error', "Error! Password does not match!");
    }
  };

document.querySelector(".form-container").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const JoinDate = new Date()
    register(name, email, password, passwordConfirm, JoinDate);
})