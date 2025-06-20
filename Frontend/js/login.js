const endpoint = '/nodeserver/login';
const url = `${BASE_API_URL}${endpoint}`;

const form = document.getElementById('loginForm');
const loader = document.getElementById('loader');
const alertBox = document.getElementById('alert');
const successPopup = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  loader.classList.remove('hidden');
  alertBox.textContent = '';

  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    loader.classList.add('hidden');

    if (!response.ok) {
      throw new Error(data.message || 'Error desconocido');
    }

    localStorage.setItem('token', data.token);
    successPopup.classList.remove('hidden');

    setTimeout(() => {
      successPopup.classList.add('hidden');
      window.location.href = 'index.html';
    }, 2000);

  } catch (err) {
    loader.classList.add('hidden');
    alertBox.textContent = err.message;
    alertBox.style.color = 'red';
    alertBox.style.textAlign = 'center';
  }
});
