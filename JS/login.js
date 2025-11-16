import {isUserSignIn } from "../JS/database.js";

const login_btn = document.getElementById("login_btn");

login_btn.addEventListener("click" ,async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const signInUser = await isUserSignIn(email , password);
  if (signInUser) {
    alert("Sign in Successfully!");
    window.location.href = `/index.html`;
  }
  else{
    window.location.href = `/HTML/register.html`;

  }
})
// login_btn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const iSsignInUser = await signInUser(email, password);
//   // if (!email && !password) {
//   //   // Toastify({
//   //   //   text: "All fields are required! Please complete the form",
//   //   //   duration: 3000,
//   //   //   gravity: "top",
//   //   //   position: "right",
//   //   //   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//   //   // }).showToast();
//   //   // return;
//   // }
//   if (iSsignInUser) {
//     // Toastify({
//     //   text: "Sign in Successfully!",
//     //   duration: 3000,
//     //   gravity: "top",
//     //   position: "right",
//     //   backgroundColor: "linear-gradient(to right, #010101, #96c93d)",
//     // }).showToast();
//     //   email.value = "";
//     //   password.value = "";
//     alert("Sign in Successfully!");
//     window.location.href = `/index.html`;
  
//   }
// });


