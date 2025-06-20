const urlGeneral = `${BASE_API_URL}/nodeserver/event/available`;
const urlAccessible = `${BASE_API_URL}/nodeserver/event/accessibility`;

const container = document.getElementById('eventContainer');
const user = JSON.parse(localStorage.getItem('user')); // Usuario autenticado

document.addEventListener('DOMContentLoaded', () => {
  if (!user) {
    window.location.href = '../index.html';
    return;
  }

  loadEvents(urlGeneral);

  document.getElementById('btn-events').addEventListener('click', () => {
    loadEvents(urlGeneral);
  });

  document.getElementById('btn-accessibility').addEventListener('click', () => {
    loadEvents(urlAccessible);
  });

  document.getElementById('btn-createEvent').addEventListener('click', () => {
    window.location.href = './createEvent.html';
  });

  document.getElementById('btn-profile').addEventListener('click', () => {
    window.location.href = './profile.html';
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  });
});

async function loadEvents(endpoint) {
  try {
    const response = await fetch(endpoint);
    const events = await response.json();

    if (!response.ok) throw new Error(events.message || 'Error al obtener eventos');

    container.innerHTML = '';
    events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const image = document.createElement('img');
    image.src = `data:image/jpeg;base64,${arrayBufferToBase64(event.eventPromotional.data)}`;
    image.alt = event.eventName;
    image.className = 'event-image';

    const info = document.createElement('div');
    info.className = 'event-info';

    const button = document.createElement('button');
    button.textContent = 'Comprar boletos';
    button.className = 'details';
    button.addEventListener('click', () => {
      localStorage.setItem('selectedEventId', event.idEvent);
      window.location.href = `./sale.html?id=${event.idEvent}`;
    });

    info.innerHTML = `
      <h3>${event.eventName}</h3>
      <p><strong>Fecha:</strong> ${new Date(event.eventDate).toLocaleString()}</p>
      <p><strong>Ciudad:</strong> ${event.eventCity}</p>
      <p><strong>Ubicación:</strong> ${event.eventLocation}</p>
    `;

    info.appendChild(button);
    card.appendChild(image);
    card.appendChild(info);
    container.appendChild(card);
  });


  } catch (err) {
    container.innerHTML = `<p class="error-msg">No se pudieron cargar los eventos.</p>`;
    console.error(err.message);
  }
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let b of bytes) binary += String.fromCharCode(b);
  return window.btoa(binary);
}
