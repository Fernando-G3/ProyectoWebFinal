document.addEventListener('DOMContentLoaded', () => {
  const BASE_API_URL = window.BASE_API_URL || ''; // Fallback si no se cargó config.js
  const urlCreateEvent = `${BASE_API_URL}/event/create`;
  const urlCreateSections = `${BASE_API_URL}/event/create-with-seats`;

  const form = document.getElementById('eventForm');
  const loader = document.getElementById('loader');
  const alertBox = document.getElementById('alert');

  if (!form) {
    console.error("No se encontró el formulario con ID 'eventForm'");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventName = form.querySelector('input[name="eventName"]');
    const eventDate = form.querySelector('input[name="eventDate"]');
    const eventLocation = form.querySelector('input[name="eventLocation"]');
    const eventCity = form.querySelector('input[name="eventCity"]');
    const eventHour = form.querySelector('input[name="eventHour"]');
    const accessibility = form.querySelector('textarea[name="accessibility"]');

    const eventMap = document.querySelectorAll('input[type="file"]')[0];
    const eventPromotional = document.querySelectorAll('input[type="file"]')[1];

    [eventName, eventDate, eventLocation, eventCity, eventHour, eventMap, eventPromotional].forEach(el => {
      el.style.border = '';
    });

    let hasError = false;

    const requiredFields = [
      { el: eventName, value: eventName.value.trim() },
      { el: eventDate, value: eventDate.value.trim() },
      { el: eventLocation, value: eventLocation.value.trim() },
      { el: eventCity, value: eventCity.value.trim() },
      { el: eventHour, value: eventHour.value.trim() },
      { el: eventMap, value: eventMap.files[0] },
      { el: eventPromotional, value: eventPromotional.files[0] }
    ];

    requiredFields.forEach(({ el, value }) => {
      if (!value) {
        el.style.border = '2px solid red';
        hasError = true;
      }
    });

    if (hasError) {
      showAlert('Por favor completa todos los campos obligatorios');
      return;
    }

    const ticketRows = document.querySelectorAll('.ticket-row');
    const sections = Array.from(ticketRows).map(row => ({
      section: row.querySelector('input[name="category[]"]').value,
      prefix: row.querySelector('input[name="prefix[]"]').value,
      quantity: parseInt(row.querySelector('input[name="quantity[]"]').value),
      price: parseFloat(row.querySelector('input[name="price[]"]').value)
    }));

    const formData = new FormData();
    formData.append('eventName', eventName.value.trim());
    formData.append('description', `Evento en ${eventLocation.value.trim()}`);
    formData.append('eventDate', `${eventDate.value.trim()}T${eventHour.value.trim()}`);
    formData.append('eventLocation', eventLocation.value.trim());
    formData.append('eventCity', eventCity.value.trim());
    formData.append('accesibility', accessibility.value.trim());
    formData.append('idOwner', 1);
    formData.append('eventMap', eventMap.files[0]);
    formData.append('eventPromotional', eventPromotional.files[0]);

    loader.style.display = 'flex';

    try {
      const response = await fetch(urlCreateEvent, {
        method: 'POST',
        body: formData
      });

      const eventData = await response.json();

      if (!response.ok) {
        throw new Error(eventData.message || 'No se pudo crear el evento');
      }

      const idEvent = eventData.event.idEvent;

      const seatResponse = await fetch(urlCreateSections, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idEvent, sections })
      });

      const seatData = await seatResponse.json();

      if (!seatResponse.ok) {
        throw new Error(seatData.message || 'No se pudieron crear las secciones');
      }

      loader.style.display = 'none';
      showAlert('¡Evento y boletos registrados correctamente!');
      form.reset();

    } catch (error) {
      loader.style.display = 'none';
      showAlert(error.message);
    }
  });

  function showAlert(message) {
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 4000);
  }
});
