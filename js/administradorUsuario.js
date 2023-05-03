import Usuario from "./classUsuario.js"

const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");
const formCargarUsuario = document.querySelector("#formCargarUsuario")



formCargarUsuario.addEventListener("submit" , cargarPelicula);




function cargarPelicula(e){
    e.preventDefault()
    console.log("aqui se carga la pelicula")
}