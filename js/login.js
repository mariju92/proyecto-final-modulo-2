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

