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
        usuario.rol,
        usuario.carrito
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
      <button class=" btn bi bi-x-lg btn-danger" onclick="borrarUsuario('${
        usuario.id
      }')"></button>
    </td>
  </tr>
    `
}


window.borrarUsuario = (id) => {
    Swal.fire({
      title: "¿Estás seguro que desea eliminar el usuario?",
      text: "Si lo haces no podrás revertir el proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Si el usuario presiona OK
        // busco en el array de usuarios al que quiero eliminar
        let posicionUsuario = listaUsuarios.findIndex(
          (usuario) => usuario.id === id
        );
  
        // borrar del array el objeto pelicula
        listaUsuarios.splice(posicionUsuario, 1);
  
        // igualar los datos del localstorage
        guardarUsuarioEnLocalStorage();
  
        // quitar la fila de la tabla
        datosTablaUsuario.removeChild(datosTablaUsuario.children[posicionUsuario]);
  
        // hacer: actualizar las filas de la tabla
        // datosTablaPelicula.children[posicionPelicula].children[0]
  
        // mostrar mensaje al usuario
        Swal.fire(
          "Usuario ELIMINADO",
          "Se elímino el usuario de la base de datos",
          "success"
        );
      }
    });
  };


  function guardarUsuarioEnLocalStorage(){
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios))
}