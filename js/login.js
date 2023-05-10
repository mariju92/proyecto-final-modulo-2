//Declaro los constantes
const btnIniciarSesion = document.querySelector("#btnIniciarSesion");
const btnIngresar = document.querySelector("#ingresar");
const pagAdmin = document.querySelector("#btnAdministrador");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const modalLogin = new bootstrap.Modal (document.querySelector("#modalLogin"));

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
    document.querySelector("#admin").classList.remove("d-none");
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
