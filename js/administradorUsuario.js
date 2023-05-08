import Usuario from "./classUsuario.js";
import { sumarioValidacionesCrear, sumarioValidacionesEditar } from "./helpersUsuario.js"

const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const rol = document.querySelector("#rol");
const divContrasenia = document.querySelector("#divContrasenia")
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");
const datosTablaUsuario = document.querySelector("#tbodyUsuarios")
const btnAgregarUsuario = document.querySelector("#btnAgregarUsuario")
const btnEditarUsuario = document.querySelector("btnEditarUsuario");
const tituloModalUsuario = document.querySelector("#tituloModalUsuario")
const btnModalRegistro = document.querySelector("#btnModalRegistro")
const formControl = document.querySelectorAll("#form-control")
const modalUsuario = new bootstrap.Modal(
  document.querySelector("#modalAgregarUsuario")
);

let estadoUsuario = true; //true = crear usuario,  false = editar usuario
let id


//traigo los usuarios de localstorage
let listaUsuarios = localStorage.getItem("listaUsuarios");
if (!listaUsuarios) {
  listaUsuarios = []
} else {
  listaUsuarios = JSON.parse(listaUsuarios).map((usuario) =>
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
formModalCargaUsuario.addEventListener("submit", cargarUsuario);


cargaInicial()

function cargarUsuario(e) {
  e.preventDefault();
  console.log("Aqui se carga el usuario")
  if (estadoUsuario === true) {
    //aqui creo el usuario
    crearUsuario();
  } else {
    //sino edito el usuario
    actualizarUsuario();
  }
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

function guardarUsuarioEnLocalStorage() {
  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios))
}
function limpiarFormularioUsuario() {
  formModalCargaUsuario.reset()
}

function verificarSiEsAdmin(email) {
  if (email.value === "admin@gmail.com" || rol.value === "administrador") {
    return "administrador"
  } else {
    return "invitado"
  }
}

function cargaInicial() {
  if (listaUsuarios.length > 0) {
    listaUsuarios.map((usuario, indice) => crearFila(usuario, indice))
  } else {
    //mostrar msj de que no hay datos para mostrar
    datosTablaUsuario.innerHTML += `
        
        <tr>
        <td colspan="5">Aún no hay datos cargados para mostrar</td>
        </tr>
        `

  }
}

function crearFila(usuario, indice) {
  datosTablaUsuario.innerHTML += `
    <tr>
    <th>${indice + 1}</th>
    <td>${usuario.nombre}</td>
    <td>${usuario.email}</td>
    <td>${usuario.rol}</td>
    <td>
      <button class=" btn bi bi-search btn-primary mx-1" id="btnEditarUsuario"  onclick="editarUsuario('${usuario.id
    }')"></button>
      <button class=" btn bi bi-x-lg btn-danger mx-1 " onclick="borrarUsuario('${usuario.id
    }')"></button>
    </td>
  </tr>
    `
}
function mostrarModalUsuario() {
  estadoUsuario = true;
  // abrir ventana modal
  modalUsuario.show();

  //sacar clase de la validacion
  limpiarClaseDeValidacion()
  // cambiar titulo del modal y texto del boton 
  tituloModalUsuario.innerHTML = "Registro  usuario"
  btnModalRegistro.innerHTML = "Crear registro"
  // completar los datos en el modal
  nombre.value = "";
  email.value = "";
  console.log("aqui tengo q devolver el input de contraseña")
  //mostrar campos de contraseña
  contrasenia.disabled = false;
  confirmarContrasenia.disabled = false;
  divContrasenia.style.display = "block";

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
      limpiarTablaUsuarios()
      cargaInicial()
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
  limpiarClaseDeValidacion()
  console.log("aqui estoy editando pelicula");
  const usuario = listaUsuarios.find((usuario) => usuario.id === idUnico);
  console.log(usuario);
  //mostrar ventana modal
  modalUsuario.show();

  // cambiar titulo del modal y texto del boton 
  tituloModalUsuario.innerHTML = "Editar Usuario"
  btnModalRegistro.innerHTML = "Aceptar"
  // completar los datos en el modal
  id = usuario.id
  nombre.value = usuario.nombre;
  email.value = usuario.email;
  rol.value = usuario.rol;

  //ocultar campos de contraseña
  contrasenia.disabled = true;
  confirmarContrasenia.disabled = true;
  divContrasenia.style.display = "none"

  // cambiar estado de variable bandera
  estadoUsuario = false;
};

function actualizarUsuario() {
  //validar los datos
  if (sumarioValidacionesEditar()) {
    console.log(listaUsuarios)
    // necesito el usuario que estoy editando
    let posicionUsuario = listaUsuarios.findIndex((usuario) => usuario.id === id);
    // actualizar las propiedades de ese usuario
    listaUsuarios[posicionUsuario].nombre = nombre.value;
    listaUsuarios[posicionUsuario].email = email.value;
    listaUsuarios[posicionUsuario].rol = rol.value;

    // actualizar localstorage
    guardarUsuarioEnLocalStorage();
    //mostrar un msj avisando lo que sucedio
    Swal.fire(
      "Usuario actualziado",
      "El usuario seleccionado fue editado correctamente",
      "success"
    );
    // que se vea en la tabla el cambio realizado
    datosTablaUsuario.children[posicionUsuario].children[1].innerText =
      nombre.value;
    datosTablaUsuario.children[posicionUsuario].children[2].innerText =
      email.value;
    datosTablaUsuario.children[posicionUsuario].children[3].innerText =
      rol.value;
    //limpiar el formulario
    limpiarFormularioUsuario();
    //cerrar el modal
    modalUsuario.hide();
  } else {
    console.log("no edita el usuario por falla en validacion")
  }
}

function limpiarClaseDeValidacion() {
  nombre.className = "form-control"
  email.className = "form-control"
  contrasenia.className = "form-control"
  confirmarContrasenia.className = "form-control"
  rol.className = "form-control"
}
function limpiarTablaUsuarios(){
  datosTablaUsuario.innerHTML = ""
}