import { showAlert } from './alert.js'
// const axios = require('axios');

const forgotPassword = async (email) => {
        try {
        const res = await axios({
        method: 'POST',
        url: 'http://localhost:4001/api/v1/users/forgotPassword',
        data: {
          email
        },
      });
      if (res.data.status === 'success') {
        showAlert('success', 'Email Sent!');
      }
      
    } catch (err) {   
      console.log(err);
       
    }
  };


  const resetPassword = async (password, passwordConfirm, resettoken) => {
    try {
    const res = await axios({
    method: 'PATCH',
    url: `http://localhost:4001/api/v1/users/resetPassword/${resettoken}`,
    data: {
      password,
      passwordConfirm
    },
  });
  if (res.data.status === 'success') {
    window.setTimeout(() => {
        location.assign('/passsuccess');
      }, 500);
  }
  
} catch (err) {   
  console.log(err);
   
}
};

const forgotpass = document.querySelector(".register-photo");
const resetpass = document.querySelector(".form-group");

if (forgotpass)
  forgotpass.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  })

if (resetpass)
  resetpass.addEventListener("submit", e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    resetPassword(password, passwordConfirm, resettoken);
  })

