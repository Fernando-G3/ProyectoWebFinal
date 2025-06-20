
const urlParams = new URLSearchParams(window.location.search);
const idEvent = urlParams.get('id') || localStorage.getItem('selectedEventId');


const sectionSelect = document.getElementById("sectionSelect");
const seatSelect = document.getElementById("seatSelect");
const form = document.getElementById("purchaseForm");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", async () => {
  if (!idEvent) {
    message.textContent = "Evento no especificado.";
    return;
  }

  await loadEventDetails();
  await loadSections();
});

async function loadEventDetails() {
  try {
    const res = await fetch(`${BASE_API}/sections/${idEvent}`);
    const event = await res.json();

    const div = document.getElementById("eventDetails");
    div.innerHTML = `
      <h3>${event.eventName}</h3>
      <p><strong>Ciudad:</strong> ${event.eventCity}</p>
      <p><strong>Lugar:</strong> ${event.eventLocation}</p>
      <p><strong>Fecha:</strong> ${new Date(event.eventDate).toLocaleString()}</p>
    `;
  } catch (err) {
    message.textContent = "Error cargando detalles del evento.";
  }
}

async function loadSections() {
  try {
    const res = await fetch(`${BASE_API_URL}/sections/${idEvent}`);
    const sections = await res.json();

    sections.forEach(section => {
      const option = document.createElement("option");
      option.value = section.idSaleSection;
      option.textContent = `${section.section} - $${section.price}`;
      sectionSelect.appendChild(option);
    });
  } catch (err) {
    message.textContent = "Error cargando secciones.";
  }
}

sectionSelect.addEventListener("change", async () => {
  const idSection = sectionSelect.value;
  seatSelect.innerHTML = `<option value="">-- Selecciona asiento --</option>`;

  if (!idSection) return;

  try {
    const res = await fetch(`${BASE_API}/seat/available/${idSection}`);
    const seats = await res.json();

    seats.forEach(seat => {
      const option = document.createElement("option");
      option.value = seat.seat;
      option.textContent = seat.seat;
      seatSelect.appendChild(option);
    });
  } catch (err) {
    message.textContent = "Error cargando asientos.";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idClient = localStorage.getItem("idClient");
  if (!idClient) {
    message.textContent = "Usuario no identificado. Inicia sesión.";
    return;
  }

  const idSection = sectionSelect.value;
  const seat = seatSelect.value;
  const typePayment = document.getElementById("paymentType").value;

  const sale = {
    idClient: parseInt(idClient),
    idEvent: parseInt(idEvent),
    total: 100, // Puedes actualizar esto con base en el precio real si lo deseas
    typePayment,
    seatsSold: [{
      idSection: parseInt(idSection),
      seat
    }]
  };

  try {
    const res = await fetch(`${BASE_API}/sale/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sale)
    });

    const result = await res.json();
    if (res.ok) {
      message.textContent = "¡Venta realizada con éxito!";
      form.reset();
    } else {
      message.textContent = result.message || "Error en la venta.";
    }
  } catch (err) {
    message.textContent = "Error al registrar la venta.";
  }
});
