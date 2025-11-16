import { fetchAllDoctors } from "../JS/database.js";

const alldoctorData = document.getElementById("alldoctorData");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const fetch = await fetchAllDoctors();
    // console.log(fetch);

    fetch.map((doctor) => {
      alldoctorData.innerHTML += `
        <div class="card1" data-id="${doctor.id}">
              <img
                src="${doctor.image}"
                alt="Dr. Sana Fatima"
                width="200"
              />
              <h4>${doctor.name}</h4>
              <p>${doctor.specialization}</p>
 <button type="submit" id="appointment">Appointment Now</button>
            </div>`;

      const cardCLick = document.querySelectorAll(".card1");
      cardCLick.forEach((cart) => {
        cart.children[3].addEventListener("click", () => {
          const cartId = cart.getAttribute("data-id");
          console.log(cartId);
          window.location.href = `/HTML/BookAppointment.html?id=${cartId}`;
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
});
