const endpointEvent = '/nodeserver/event/create';
const endpointSeats = '/nodeserver/event/create-with-seats';
const urlEvent = `${BASE_API_URL}${endpointEvent}`;
const urlSeats = `${BASE_API_URL}${endpointSeats}`;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eventForm');
  const loader = document.getElementById('loader');
  const alertBox = document.getElementById('alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventName = form.querySelector('input[name="eventName"]').value.trim();
    const eventDate = form.querySelector('input[name="eventDate"]').value.trim();
    const eventLocation = form.querySelector('input[name="eventLocation"]').value.trim();
    const eventCity = form.querySelector('input[name="eventCity"]').value.trim();
    const eventHour = form.querySelector('input[name="eventHour"]').value.trim();
    const idOwner = 1;  // Asume un ID de propietario para la prueba
    const accessibility = form.querySelector('textarea[name="accessibility"]').value.trim();

    const eventMap = form.querySelector('input[type="file"]').files[0];
    const eventPromotional = form.querySelector('input[type="file"]:nth-of-type(2)').files[0];

    // Recoger secciones de boletos
    const ticketRows = document.querySelectorAll('.ticket-row');
    const sections = Array.from(ticketRows).map(row => ({
      section: row.querySelector('input[name="category[]"]').value,
      prefix: row.querySelector('input[name="prefix[]"]').value,
      quantity: row.querySelector('input[name="quantity[]"]').value,
      price: row.querySelector('input[name="price[]"]').value,
    }));

    if (!eventName || !eventDate || !eventLocation || !eventCity || !eventHour) {
      return alert('Todos los campos son obligatorios');
    }

    loader.style.display = 'flex';

    try {
      // 1. Registrar el evento
      const eventFormData = new FormData();
      eventFormData.append('eventName', eventName);
      eventFormData.append('eventDate', eventDate);
      eventFormData.append('eventLocation', eventLocation);
      eventFormData.append('eventCity', eventCity);
      eventFormData.append('idOwner', idOwner);
      eventFormData.append('accesibility', accessibility);
      eventFormData.append('eventMap', eventMap);
      eventFormData.append('eventPromotional', eventPromotional);

      const eventResponse = await fetch(urlEvent, {
        method: 'POST',
        body: eventFormData
      });

      const eventData = await eventResponse.json();

      if (!eventResponse.ok) {
        throw new Error(eventData.message || 'Error al publicar el evento');
      }

      // 2. Registrar las secciones y asientos
      const seatsData = { sections, idEvent: eventData.event.idEvent };
      
      const seatsResponse = await fetch(urlSeats, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seatsData)
      });

      const seatsDataResult = await seatsResponse.json();

      loader.style.display = 'none';

      if (!seatsResponse.ok) {
        throw new Error(seatsDataResult.message || 'Error al crear las secciones y asientos');
      }

      alertBox.textContent = '¡Evento y boletos publicados correctamente!';
      alertBox.style.display = 'block';

      setTimeout(() => {
        alertBox.style.display = 'none';
        form.reset();
      }, 3000);

    } catch (error) {
      loader.style.display = 'none';
      alert(error.message);
    }
  });
});
