const urlGetEvents = `${BASE_API_URL}/nodeserver/event/available`;

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('eventContainer');

  try {
    const response = await fetch(urlGetEvents);
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

      info.innerHTML = `
        <h3>${event.eventName}</h3>
        <p><strong>Fecha:</strong> ${new Date(event.eventDate).toLocaleString()}</p>
        <p><strong>Ciudad:</strong> ${event.eventCity}</p>
        <p><strong>Ubicación:</strong> ${event.eventLocation}</p>
        <button class="details">Comprar boletos</button>
      `;

      card.appendChild(image);
      card.appendChild(info);
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p class="error-msg">No se pudieron cargar los eventos.</p>`;
    console.error(err.message);
  }
});

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let b of bytes) binary += String.fromCharCode(b);
  return window.btoa(binary);
}
