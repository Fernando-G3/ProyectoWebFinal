const endpoint = '/login';
const url = `${BASE_API_URL}${endpoint}`;

const form = document.getElementById('loginForm');
const loader = document.getElementById('loader');
const alertBox = document.getElementById('alert');
const successPopup = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  loader.classList.remove('hidden');
  alertBox.textContent = '';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value.trim();

  if (!e.target.checkValidity()) {
    const firstInvalid = e.target.querySelector(':invalid');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.reportValidity();
    }
    return;
  }

  try {
    console.log("URL final:", url);

    const response = await fetch(url, { 
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



//boton mostrar u ocultar contrasenia
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Cambia el ícono
      togglePassword.classList.toggle('fa-eye');
      togglePassword.classList.toggle('fa-eye-slash');
    });
  }
});


document.getElementById('goToRegister').addEventListener('click', () => {
  window.location.href = 'registerUser.html';
});

