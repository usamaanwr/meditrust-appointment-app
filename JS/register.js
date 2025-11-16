import { createNewUser } from "../JS/database.js";

const sign_Up_btn = document.getElementById("sign_Up_btn");
sign_Up_btn.addEventListener("click" ,async(e)=>{
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const password = document.getElementById("password").value;
  const isSignUpUser = await createNewUser(email , password , name , age);
  if (isSignUpUser) {
    alert("User register succesfully")
           window.location.href = `/HTML/login.html`;
console.log(isSignUpUser);

  }
})