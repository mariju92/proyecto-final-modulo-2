import Usuario from "./classUsuario.js";
import {sumarioValidaciones} from "./helpersUsuario.js"

const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const rol = document.querySelector("#rol");
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");
const datosTablaUsuario = document.querySelector("#tbodyUsuarios")
const btnAgregarUsuario = document.querySelector("#btnAgregarUsuario")
const btnEditarUsuario = document.querySelector("btnEditarUsuario");
const tituloModalUsuario = document.querySelector("#tituloModalUsuario")
const btnModalRegistro = document.querySelector("#btnModalRegistro")





const modalUsuario = new bootstrap.Modal(
  document.querySelector("#modalAgregarUsuario")
);

let estadoUsuario = true; //true = crear usuario,  false = editar usuario



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


btnAgregarUsuario.addEventListener("click", mostrarModalUsuario);
formModalCargaUsuario.addEventListener("submit" , cargarUsuario);


cargaInicial()



function cargarUsuario(e){
  e.preventDefault()
  console.log("aqui se carga el usuario")
  crearUsuario();
}
function crearUsuario(){
  //validar datos
  if(sumarioValidaciones()){
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
      console.log(nuevoUsuario)
  //guardar el usuario en localstorage
  guardarUsuarioEnLocalStorage();
  //limpiar el formulario
  limpiarFormularioUsuario();
  //cerrar modal
  modalUsuario.hide();
  //dibujar la fila al final de la tabla
  let indiceUsuario = listaUsuarios.length - 1;
  crearFila(nuevoUsuario, indiceUsuario);
  //mostrar cartel al usuario de que se creo corretamente
   Swal.fire(
       "Usuario creado",
       "El usuario fue creado correctamente",
       "success"
     );

  }
  
}

function guardarUsuarioEnLocalStorage(){
  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios))
}
function limpiarFormularioUsuario(){
  formModalCargaUsuario.reset()
}

function verificarSiEsAdmin(email){
  if(email.value === "admin@gmail.com"){
     return  "administrador"
  } else{
     return  "invitado"
  }
}

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
      <button class=" btn bi bi-search btn-primary mx-1" id="btnEditarUsuario"  onclick="editarUsuario('${
        usuario.id
      }')"></button>
      <button class=" btn bi bi-x-lg btn-danger mx-1 " onclick="borrarUsuario('${
        usuario.id
      }')"></button>
    </td>
  </tr>
    `
}
function mostrarModalUsuario() {
  estadoUsuario = true;
  // abrir ventana modal
  modalUsuario.show();
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
  
window.editarUsuario = (idUnico) => {
    console.log("aqui estoy editando pelicula");
    const usuario = listaUsuarios.find((usuario) => usuario.id === idUnico);
    console.log(usuario);
    //mostrar ventana modal
    modalUsuario.show();
  
    // cambiar titulo del modal y texto del boton 
    tituloModalUsuario.innerHTML = "Editar Usuario"
    btnModalRegistro.innerHTML = "Aceptar"
    // completar los datos en el modal
    nombre.value = usuario.nombre;
    email.value = usuario.email;
    rol.value = usuario.rol;

    //ocultar campos de contraseña
    contrasenia.disabled = true;
    confirmarContrasenia.disabled = true;

 
    
  
    // cambiar estado de variable bandera
    estadoUsuario = false;
  };
  
  // function actualizar() {
  //   //validar los datos
  //   let sumario = sumarioValidaciones(
  //     titulo.value,
  //     descripcion.value,
  //     imagen.value,
  //     duracion.value,
  //     genero.value,
  //     anio.value,
  //     pais.value,
  //     reparto.value
  //   );
  //   if (sumario.length === 0) {
  //     // necesito la pelicula que estoy editando
  //     let posicionPelicula = listaPeliculas.findIndex(
  //       (peli) => peli.codigo === codigo.value
  //     );
  //     // actualizar las propiedades de esa peli
  //     listaPeliculas[posicionPelicula].titulo = titulo.value;
  //     listaPeliculas[posicionPelicula].descripcion = descripcion.value;
  //     listaPeliculas[posicionPelicula].imagen = imagen.value;
  //     listaPeliculas[posicionPelicula].genero = genero.value;
  //     listaPeliculas[posicionPelicula].anio = anio.value;
  //     listaPeliculas[posicionPelicula].duracion = duracion.value;
  //     listaPeliculas[posicionPelicula].pais = pais.value;
  //     listaPeliculas[posicionPelicula].reparto = reparto.value;
  //     // actualizar localstorage
  //     guardarEnLocalStorage();
  //     //mostrar un msj avisando lo que sucedio
  //     Swal.fire(
  //       "Pelicula actualziada",
  //       "La pelicula seleccionada fue editada correctamente",
  //       "success"
  //     );
  //     // que se vea en la tabla el cambio realizado
  //     datosTablaPelicula.children[posicionPelicula].children[1].innerText =
  //       titulo.value;
  //     datosTablaPelicula.children[posicionPelicula].children[2].innerText =
  //       descripcion.value;
  //     datosTablaPelicula.children[posicionPelicula].children[3].innerText =
  //       imagen.value;
  //     datosTablaPelicula.children[posicionPelicula].children[4].innerText =
  //       genero.value;
  //     //limpiar el formulario
  //     limpiarFormularioPeliculas();
  //     //cerrar el modal
  //     modalPelicula.hide();
  //   } else {
  //     msjFormulario.className = "alert alert-danger mt-3";
  //     msjFormulario.innerHTML = sumario;
  //     setTimeout(ocultarAlerError, 8000);
  //   }
  // }

