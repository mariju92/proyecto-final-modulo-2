const botonIniciarSesion = document.querySelector(".botonIniciarSesion");
const mostrarModalInicioSesion = document.querySelector("#exampleModal");
const FormularioLogin = document.querySelector(".formLogin");
const Email = document.querySelector(".usuario");
const password = document.querySelector(".password");

//manejadores de eventos
botonIniciarSesion.addEventListener("click", mostrarModalInicioSesion);

// cargar usuario de administrador
const administrador = {
  Email: "admin@gmail.com",
  password: ".Code123",
  rol: "administrador",
};

verificarAdministrador();
function verificarAdministrador() {
  let esAdministrador = sessionStorage.getItem("administrador");
  if (esAdministrador) {
    botonIniciarSesion.innerHTML = "Cerrar Sesión";
    
  } else {
    botonIniciarSesion.innerHTML = "Iniciar Sesión";
    document.querySelector(".paginaAdministrador").classList.remove("d-none");
    let webAdmin = window.location.origin + "/pages/administrador.html";
    if (window.location.href === webAdmin) {
      document.querySelector(".fondoNegro").innerHTML =
        '<h2 class="text-center"> No posee los permisos para acceder a esta página, redireccionando a página principal</h2>';
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 3000);
    }
  }
}

function mostrarModal() {
  if (botonIniciarSesion.innerHTML === "IniciarSesion") {
    mostrarModalInicioSesion.show();
  } else {
    CerrarSesion();
  }
}

function validarEmail() {
  const regExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regExp.test(Email.value)) {
    Email.className = "form-control is-valid";
    return true;
  } else {
    Email.className = "form-control is-invalid";
    return false;
  }
}

function validarPassword() {
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  if (regExp.test(password.value)) {
    password.className = "form-control is-valid";
    return true;
  } else {
    password.className = "form-control is-invalid";
    return false;
  }
}

function IniciarSesion(e) {
  e.preventDefault();
  //validar input
  if (validarEmail() && validarPassword()) {
    if (
      Email.value === administrador.Email &&
      password.value === administrador.password
    ) {
      //guardo Administrador en LS y cambio el botón por cerrar sesión
      alert.className = "alert alert-danger mt-3 d-none";
      botonIniciarSesion.innerHTML = "Cerrar Sesión";
      // Almaceno el objeto JSON en la sessionStorage
      sessionStorage.setItem("administrador", JSON.stringify(administrador));
      //habilito la opción del administrador en el navbar
      document.querySelector(".paginaAdministrador").classList.remove("d-none");
      mostrarModalInicioSesion.hide();
    } else {
      alert.className = "alert alert-danger mt-3";
    }
  }
}

function CerrarSesion() {
  sessionStorage.removeItem("administrador");
  botonIniciarSesion.innerHTML = "Iniciar Sesión";
  document.querySelector(".paginaAdministador").classList.add("d-none");
  //Redireccionar a página de inicio
  window.location.href = window.location.origin;
}




