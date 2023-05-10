import Usuario from "./classUsuario.js";

const carritoSuperior = document.querySelector("#btnCarrito")
const btnAdministrador = document.querySelector("#btnAdministrador")
const alert = document.querySelector("#alert")
const formLogin = document.querySelector("#formLogin")
const email = document.querySelector("#email")
const contrasenia = document.querySelector("#contrasenia")
const botonIniciarSesion = document.querySelector("#btnIniciarSesion");
const botonCerrarSesion = document.querySelector("#btnCerrarSesion");


const modalLogin = new bootstrap.Modal(
  document.querySelector("#modalLogin")
);

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
let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

//manejadores de eventos
botonIniciarSesion.addEventListener("click", mostrarModal);
botonCerrarSesion.addEventListener("click", cerrarSesion);
formLogin.addEventListener("submit", iniciarSesion)

buscarRolDeUsuario()
actualizarCarritoSuperior()
//Buscar usuario en localstorage y mostrar lo que corresponda segun su rol
function buscarRolDeUsuario(){
  let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
  if(usuarioLogueado){
    if(usuarioLogueado.rol === "invitado"){
      console.log("Usuario invitado")
      btnAdministrador.className = "d-none"
      botonIniciarSesion.className = "d-none"
      botonCerrarSesion.className = "btn botonIniciarSesion"
      carritoSuperior.className = "btn"


    } else{
      console.log("Usuario administrador")
      btnAdministrador.className = "nav-link opcionNav paginaAdministrador"
      botonIniciarSesion.className = "d-none"
      botonCerrarSesion.className = "btn botonIniciarSesion"
      carritoSuperior.className = "btn"
    }
  } else{
    console.log("No hay usuario logueado")
    btnAdministrador.className = "d-none"
    botonIniciarSesion.className = "btn botonIniciarSesion"
    botonCerrarSesion.className = "d-none"
    carritoSuperior.className = "d-none"
  }
  
}


function mostrarModal() {
  modalLogin.show();
}

function iniciarSesion(e){
  e.preventDefault()
  //Validar campos
  let usuarioEncontrado = listaUsuarios.find((usuario=>
    ((usuario.email === email.value) && (usuario.contrasenia === contrasenia.value))))
    if(usuarioEncontrado){
      console.log(usuarioEncontrado)
       //buscar rol de usuario
       
      //cargar en el sessionstorage
      sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

      //ocultar el modal
      modalLogin.hide()
      window.location.href = window.location.origin

      } else{
      console.log("ese usuario no esta registrado")
        // si no se cumple la validacion
        alert.className = "text-danger"
    }
  
        

}
function cerrarSesion(){
  Swal.fire({
    title: 'Estas seguro?',
    text: "Seguro que deseas cerrar sesion?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem("usuarioLogueado")
      buscarRolDeUsuario()
      Swal.fire(
        'Sesion CERRADA!',
        'Tu sesion ha sido cerrada',
        'success'
      )
       //redireccionar a la pagina principal
       window.location.href = window.location.origin
    }
  })
  
}




//CODIGO QUE MUESTRA LA CANTIDAD DE PRODUCTOS EN EL CARRITO DEL NAVBAR
function actualizarCarritoSuperior() {
  let cantidadTotal = 0;
  if(usuarioLogueado){
    usuarioLogueado.carrito.map((carrito) => {
      cantidadTotal = cantidadTotal + carrito.cantidad;
      carritoSuperior.innerHTML = `<i
    class="bi bi-cart-fill opcionNav carrito"></i><span
    class="badge translate-middle bg-danger ">${cantidadTotal || 0}</span>`;
  
  })
}
}
  
