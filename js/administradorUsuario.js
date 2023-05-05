import Usuario from "./classUsuario.js";

const datosTablaUsuario = document.querySelector("#tbodyUsuarios")

//traigo los usuarios de localstorage
let listaUsuarios = localStorage.getItem("listaUsuarios");
if(!listaUsuarios){
    listaUsuarios = []
} else{
    listaUsuarios = JSON.parse(listaUsuarios).map((usuario)=>
    new Usuario(
        usuario.id,
        usuario.nombre,
        usuario.email,
        usuario.contrasenia,
        usuario.rol
    )
    )
}

cargaInicial()

function cargaInicial (){
    if(listaUsuarios.length >= 0){
        listaUsuarios.map((usuario, indice) => crearFila(usuario, indice))
    } else{
        //mostrar msj de que no hay datos para mostrar
    }
}

function crearFila(usuario, indice){
    datosTablaUsuario.innerHTML += `
    <tr>
    <th>${indice + 1}</th>
    <td>${usuario.nombre}</td>
    <td>${usuario.email}</td>
    <td>${usuario.rol}</td>
    <td>
      <button class=" btn bi bi-search btn-primary"></button>
      <button class=" btn bi bi-pencil btn-warning my-3 my-md-0"></button>
      <button class=" btn bi bi-x-lg btn-danger"></button>
    </td>
  </tr>
    `
}