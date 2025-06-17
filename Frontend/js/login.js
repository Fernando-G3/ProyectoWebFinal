const API_BASE_URL = 'http://192.168.56.1:8080/api/nodeserver/users';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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
