const endpoint = '/login';
const url = `${BASE_API_URL}${endpoint}`;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

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

    if (response.ok) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('No se pudo conectar con el servidor');
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

