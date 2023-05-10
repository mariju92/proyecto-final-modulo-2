//Declaro los constantes
const btnIniciarSesion = document.querySelector("#btnIniciarSesion");
const btnIngresar = document.querySelector("#ingresar");
const pagAdmin = document.querySelector("#btnAdministrador");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const modalLogin = new bootstrap.Modal(document.querySelector("#modalLogin"));

//Agrego evento a boton ingresar
btnIniciarSesion.addEventListener("click", mostrarModal);
btnIngresar.addEventListener("submit", iniciarSesion);

//Cargo constante de Administrador
const administrador = {
  email: "admin@gmail.com",
  password: "Code123",
};

//Creo la funcion para verificar el usuario administrador
verificarAdmin();

function verificarAdmin() {
  let siAdmin = sessionStorage.getItem("usuario");
  if (siAdmin) {
    btnIniciarSesion.innerHTML = "Cerrar Sesión";
    document.querySelector("#btnAdministrador").classList.remove("d-none");
  } else {
    btnIniciarSesion.innerHTML = "Iniciar Sesión";
    let webAdmin = window.location.origin + "/pages/administrador.html";

    if (window.location.href === webAdmin) {
      document.querySelector("main").innerHTML =
        '<h2 class="text-center"> No posee autorización para ingresar a esta página, volviendo a Inicio';
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 3000);
    }
  }
}

//Se agrega la funcion para mostrar el modal
function mostrarModal() {
  if (btnIniciarSesion.innerHTML === "Iniciar Sesión") {
    modalLogin.show();
  } else {
    cerrarSesion();
  }
}

//agrego la funcion para el inicio de sesion
function iniciarSesion(e) {
  e.preventDefault();
  if (validarEmail() && validarPassword()) {
    if (
      email.value === administrador.email &&
      password.value === administrador.password
    ) {
      alert.className = "alert alert-danger mt-3 d-none";
      btnIniciarSesion.innerHTML = "Cerrar Sesión";
      sessionStorage.setItem("usuario", JSON.stringify(administrador));
      document.querySelector("#btnAdministrador").classList.remove("d-none");
      modalLogin.hide();
    } else {
      alert.className = "alert alert-danger mt-3";
    }
  }
}

//Se crea la funcion para cerrar sesion
function cerrarSesion() {
  sessionStorage.removeItem("usuario");
  btnIngresar.innerHTML = "Iniciar Sesión";
  document.querySelector("#admin").classList.add("d-none");
  window.location.href = window.location.origin;
}

//funcion para validar el email del administrador
function validarEmail() {
  const regExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regExp.test(email.value)) {
    email.className = "form-control is-valid";
    return true;
  } else {
    email.className = "form-control is- invalid";
    return false;
  }
}

//Funcion para validar la contraseña
function validarPassword() {
  const regExp = /^[a-zA-Z0-9]{5,15}$/;
  if (regExp.test(password.value)) {
    password.className = "form-control is valid";
    return true;
  } else {
    password.className = "form-control is-invalid";
    return false;
  }
}
