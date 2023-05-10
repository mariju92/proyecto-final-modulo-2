import Usuario from "./classUsuario.js";
import { sumarioValidacionesCrear } from "./helpersUsuario.js";

const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");
const formCargarUsuario = document.querySelector("#formCargarUsuario");

//traigo los usuarios de localstorage
let listaUsuarios = localStorage.getItem("listaUsuarios");
if (!listaUsuarios) {
  listaUsuarios = [];
} else {
  listaUsuarios = JSON.parse(listaUsuarios).map(
    (usuario) =>
      new Usuario(
        usuario.id,
        usuario.nombre,
        usuario.email,
        usuario.contrasenia,
        usuario.rol,
        usuario.carrito
      )
  );
}

formCargarUsuario.addEventListener("submit", cargarUsuario);

function cargarUsuario(e) {
  e.preventDefault();
  console.log("aqui se carga el usuario");
  crearUsuario();
}
function crearUsuario() {
  //validar datos
  if (sumarioValidacionesCrear()) {
    //crear el usuario
    let nuevoUsuario = new Usuario(
      undefined,
      nombre.value,
      email.value,
      contrasenia.value,
      verificarSiEsAdmin(email),
      []
    );
    listaUsuarios.push(nuevoUsuario);
    console.log(nuevoUsuario);
    //guardar el usuario en localstorage
    guardarUsuarioEnLocalStorage();
    //limpiar el formulario
    limpiarFormularioUsuario();
    //mostrar cartel al usuario de que se creo corretamente

    Swal.fire(
      "Usuario creado",
      "El usuario fue creado correctamente",
      "success"
    );
    //redireccionar a la pagina principal
    window.location.href = window.location.origin;
  }
}
function guardarUsuarioEnLocalStorage() {
  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
}
function limpiarFormularioUsuario() {
  formCargarUsuario.reset();
}

function verificarSiEsAdmin(email) {
  if (email.value === "admin@gmail.com") {
    return "administrador";
  } else {
    return "invitado";
  }
}
