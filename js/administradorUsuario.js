import Usuario from "./classUsuario.js"

const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");
const formCargarUsuario = document.querySelector("#formCargarUsuario")

let listaUsuarios = localStorage.getItem("listaUsuarios");
if (!listaUsuarios){
    listaUsuarios = []
} else{
    listaUsuarios = JSON.parse(listaUsuarios).map((usuario)=>{
        new Usuario(
            usuario.id,
            usuario.nombre,
            usuario.email,
            usuario.contrasenia,
            usuario.rol
        )
    })
}


formCargarUsuario.addEventListener("submit" , cargarUsuario);




function cargarUsuario(e){
    e.preventDefault()
    console.log("aqui se carga el usuario")
    crearUsuario();

}
function crearUsuario(){
    //validar datos
    //crear el usuario
    let nuevoUsuario = new Usuario(
        undefined,
        nombre.value,
        email.value,
        contrasenia.value,
        undefined
        )
    
        listaUsuarios.push(nuevoUsuario);
        console.log(nuevoUsuario)
    //guardar el usuario en localstorage
    guardarUsuarioEnLocalStorage();
    //limpiar el formulario
    limpiarFormularioUsuario();
    //dibujar la fila al final de la tabla
    //mostrar cartel al usuario de que se creo corretamente
}

function guardarUsuarioEnLocalStorage(){
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios))
}
function limpiarFormularioUsuario(){
    formCargarUsuario.reset()
}