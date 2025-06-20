const urlCreateEvent = `${BASE_API_URL}/nodeserver/event/create`;
const user = JSON.parse(localStorage.getItem('user'));

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eventForm');
  const loader = document.getElementById('loader');
  const alertBox = document.getElementById('alert');

  if (!user) {
    window.location.href = '../index.html';
    return;
  }

  document.getElementById('btn-accessibility').addEventListener('click', () => {
    window.location.href = './events.html';
  });
  document.getElementById('btn-events').addEventListener('click', () => {
    window.location.href = './events.html';
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

  if (!form) {
    console.error("No se encontró el formulario con ID 'eventForm'");
    return;
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

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

    loader.style.display = 'flex';

    try {
      const mapBase64 = await toBase64(eventMap.files[0]);
      const promoBase64 = await toBase64(eventPromotional.files[0]);

      const payload = {
        eventName: eventName.value.trim(),
        description: `Evento en ${eventLocation.value.trim()}`,
        eventDate: `${eventDate.value.trim()}T${eventHour.value.trim()}`,
        eventLocation: eventLocation.value.trim(),
        eventCity: eventCity.value.trim(),
        accesibility: accessibility.value.trim(),
        isAvailable: 'Activo',
        idOwner: user.idUser,
        eventMap: mapBase64,
        eventPromotional: promoBase64
      };

      const response = await fetch(urlCreateEvent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al registrar evento');

      const idEvent = data.event?.idEvent;
      if (!idEvent) throw new Error('No se recibió ID del evento');

      localStorage.setItem('createdEventId', idEvent);
      window.location.href = './createSection.html';

    } catch (error) {
      loader.style.display = 'none';
      showAlert(error.message);
    }
  });

  function showAlert(message) {
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 4000);
  }
});
