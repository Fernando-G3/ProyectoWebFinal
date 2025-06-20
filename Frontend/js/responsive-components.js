document.addEventListener("DOMContentLoaded", () => {
  function applyResponsiveClasses() {
    const width = window.innerWidth;

    // Reglas para login
    const containerLogin = document.getElementById("containerLogin");
    const leftLogin = document.getElementById("leftLogin");
    const rightLogin = document.getElementById("rightLogin");
    const loginForm = document.getElementById("loginForm");

    if (containerLogin && leftLogin && rightLogin && loginForm) {
      if (width <= 768) {
        containerLogin.classList.add("mobile-login");
        leftLogin.classList.add("mobile-left");
        rightLogin.classList.add("mobile-right");
        loginForm.classList.add("mobile-form");
      } else {
        containerLogin.classList.remove("mobile-login");
        leftLogin.classList.remove("mobile-left");
        rightLogin.classList.remove("mobile-right");
        loginForm.classList.remove("mobile-form");
      }
    }

    // Aquí puedes agregar otras reglas para otras páginas
    // if (document.getElementById("registroForm")) { ... }
  }

  applyResponsiveClasses();
  window.addEventListener("resize", applyResponsiveClasses);
});
