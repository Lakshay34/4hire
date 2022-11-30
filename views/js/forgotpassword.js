import { showAlert } from './alert.js'
// const axios = require('axios');

const forgotPassword = async (email) => {
  try {
    const res = await axios({
    method: 'POST',
    url: '/api/v1/users/forgotPassword',
    data: {
      email
    },
  });
  if (res.data.status === 'success') {
    showAlert('success', 'Email Sent!');
    document.getElementById("new").innerHTML = 
    `<div class="register-photo" style="background-color:  #FFFFFF;">
        <div class="form-container">
            <div class="image-holder" style="background-image: url(&quot;assets/img/forgot-password%20pic.png&quot;);background-position: top;"></div><form method="post"  style="border:1px solid; border-radius: 15px";>
    <h2 class="text-center" style="font-family: Roboto, sans-serif;"><strong>Reset Password</strong></h2>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password"/>
    </div>
    <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control" name="cpassword"/>
    </div>
    <br>
    <br>
    <div class="form-group">
        <button class="btn btn-block" type="submit" style="font-family: Roboto, sans-serif; background-color:#67A4F9; color:#fff">Reset Password</button></div><a class="already" href="/login" style="font-family: Roboto, sans-serif; color:#0D9CEC">Back to login</a></form></div>
    </div>`
  }
  } catch (err) {   
    showAlert('error', "There is No user with this email address")
  }
};


const resetPassword = async (password, passwordConfirm) => {
  try {
    const res = await axios({
    method: 'PATCH',
    url: `/api/v1/users/resetPassword/${resettoken}`,
    data: {
      password,
      passwordConfirm
    },
  });
  if (res.data.status === 'success') {
        document.getElementById("new").innerHTML = 
        `<img class="center" src="assets/img/reset%20pass.png" style="width: 400x;height: 350px;">
        <h1 class="text-center" style="font-size: 26px;font-family: Roboto, sans-serif;font-weight: bold;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Your password has been succeccfully reset<br><a class="text-center" style="font-weight: normal;font-family: Roboto, sans-serif;font-size: 18px;margin-left: 50px;" href="/login">Back to login</a></h1>
        <script src="assets/js/jquery.min.js"></script>`
  }
  } catch (err) {   
    // console.log(err);
    showAlert('error', "Error")
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
    resetPassword(password, passwordConfirm);
  })

