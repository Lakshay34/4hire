const login = async (email, password) => {
    console.log(email, password)
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:4001/api/v1/users/login',
        data: {
          email,
          password
        }
      });
      if (res.data.status === 'success') {
        alert('successfully Logged in');
        // window.setTimeout(() => {
        //   location.assign('/login');
        // }, 1500);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

document.querySelector(".form-container").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
})