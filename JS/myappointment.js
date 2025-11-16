import {
  fetchAllAppointment,
  getUserSession,
  fetchAllDoctors,
  signOutUser,
} from "../JS/database.js";
const userAppointment = document.getElementById("userAppointment");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const usersession = await getUserSession();
    console.log(usersession);

    if (usersession.session) {
      const fetchAppointment = await fetchAllAppointment();
      // console.log(fetchAppointment);

      const alldoctor = await fetchAllDoctors();
      // console.log(alldoctor);

      fetchAppointment.map((appointment) => {
        const doctor_id = appointment.doctor_id;
        // console.log(doctor_id);
        const doctor = alldoctor.filter((doctor) => doctor.id == doctor_id);
        // console.log(doctor[0]);
        const { name, specialization, image } = doctor[0];
        userAppointment.innerHTML += `
 <div class="userDetail">
 <div class="doctorDetail">
 <img src="${image}" alt="">
 <div class="appointment">
 <div>
 
 <h5>${name}</h5>
 <h5>${specialization}</h5>
 <h5> Patient ${appointment.patient_name}</h5>
 </div>
  <div>
   <h5>Doctor Appointment</h5>
 <h5>${appointment.doctor_days}</h5>
 <h5>${appointment.date}</h5>
 <h5>${appointment.time}</h5>
  </div>
 </div>
 </div>
 <div class = "icon_user">
 
 <span><i class="fa-solid fa-user-pen    "></i></span>
 <span><i class="fa-solid fa-delete-left"></i></span>
 </div>
</div>
`;

});
}
const logout_btn =  document.getElementById("logout_btn");
logout_btn.addEventListener("click",async (e) => {
  e.preventDefault()
  const logoutUSer = await signOutUser();
  if (!logoutUSer) {
    Toastify({
          text: "User logged out successfully!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return
  }
})

   
  } catch (error) {
    console.error(error.message);
    return error;
  }
});
