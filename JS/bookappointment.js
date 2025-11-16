import {
  detailByDoctorId,
  getUserSession,
  appointmentCreate,
} from "../JS/database.js";
const param = new URLSearchParams(window.location.search);
const doctorId = param.get("id");
console.log(doctorId);
// const user = JSON.parse(
//   localStorage.getItem("sb-wertaibhtusrnnewcmpf-auth-token")
// );
// console.log(user);
const doctor_days = document.getElementById("doctors_day");
const patient_name = document.getElementById("appointmentName");
const appointmentDate = document.getElementById("appointmentDate");
const reason = document.getElementById("reason");
const appointmentTime = document.getElementById("appointmentTime");
const appointment_btn = document.getElementById("submit_appointment");


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const getSession = await getUserSession();

    if (!getSession.session) {
       window.location.href = `/HTML/login.html`;
    }

    // console.log(user.user_metadata.first_name);
    
    // console.log(getSession);
    const user = getSession.session.user;
      const detailByDoctor = await detailByDoctorId(doctorId);
    //   console.log(detailByDoctor);
      if (detailByDoctor) {
        const singleDoctorDetail =
          document.getElementById("singleDoctorDetail");
          // let username = user.user_metadata?.first_name;
          // patient_name.value = username
          // console.log(patient_name);
        singleDoctorDetail.innerHTML = ` <div class="card">
              <img
                src="${detailByDoctor.image}"
                alt="Dr. Sana Fatima"
                width="200"
              />
              <h4>${detailByDoctor.name}</h4>
              <p> Specialization ${detailByDoctor.specialization}</p>
              <p>Experience ${detailByDoctor.experience} years</p>
            </div>`;

        appointment_btn.addEventListener("click", async (e) => {
          e.preventDefault();
          const formAppointment = await appointmentCreate({
           patient_name:patient_name.value,
            date: appointmentDate.value,
            time: appointmentTime.value,
            doctor_days: doctor_days.value,
            description: reason.value,
            patient_id: user.id,
            doctor_id: detailByDoctor.id,
           
          });
          console.log(formAppointment);
          if (formAppointment) {
             Toastify({
      text: "Your appointment has been successfully created!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();

     patient_name.value = "";
    appointmentTime.value = "";
    appointmentDate.value = "";
    doctor_days.value = "";
    reason.value = "";
          }
        });
      }
  } catch (error) {
    console.error(error.message);
    return error;
  }
});
