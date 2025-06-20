const endpoint = '/nodeserver/login';
const url = `${BASE_API_URL}${endpoint}`;

const form = document.getElementById('loginForm');
const loader = document.getElementById('loader');
const alertBox = document.getElementById('alert');
const successPopup = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (loader) loader.classList.remove('hidden');
  alertBox.textContent = '';

  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();

  console.log("Enviando:", JSON.stringify({ email, password }));

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (loader) loader.classList.add('hidden');

    if (!response.ok) {
      throw new Error(data.message || 'Error desconocido');
    }

    localStorage.setItem('user', JSON.stringify(data.user));

    if (successPopup) {
      successPopup.textContent = 'Inicio de sesión exitoso';
      successPopup.classList.remove('hidden');
    }

    setTimeout(() => {
      if (successPopup) successPopup.classList.add('hidden');
      window.location.href = 'html/events.html';
    }, 1500);

  } catch (err) {
    if (loader) loader.classList.add('hidden');
    alertBox.textContent = err.message;
    alertBox.style.color = 'red';
    alertBox.style.textAlign = 'center';
  }
});
