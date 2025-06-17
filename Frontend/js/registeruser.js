const API_URL = 'http://192.168.56.1:8080/api/nodeserver/register';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const loader = document.getElementById('loader');
  const alertBox = document.getElementById('alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const lastname = form.querySelector('input[name="lastname"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value.trim();
    const typeSelection = form.querySelector('select[name="typeUser"]').value;

    let typeUser = 0;
    if (typeSelection === 'fan') {
      typeUser = 1;
    } else if (typeSelection === 'organizer') {
      typeUser = 2;
    }

    if (!name || !lastname || !email || !password || typeUser === 0) {
      return alert('Todos los campos son obligatorios');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert('Por favor ingresa un correo electrónico válido');
    }

    if (password.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres');
    }

    loader.style.display = 'flex';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
          typeUser,
        }),
      });

      const data = await response.json();

      loader.style.display = 'none';

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      alertBox.textContent = '¡Registro exitoso!';
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
