import Producto from "./claseProducto.js";
import Usuario from "./classUsuario.js";
let listaProductosCarrito = [];
let cantidadTotal = 0;



let listaProducto = localStorage.getItem(`listaProducto`);
if (!listaProducto) {
  listaProducto = [];
} else {
  listaProducto = JSON.parse(listaProducto).map(
    (producto) =>
      new Producto(
        producto.codigo,
        producto.nombre,
        producto.precio,
        producto.categoria,
        producto.imagen,
        producto.descripcion,
        producto.stock,
        producto.destacado
      )
  );
}

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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

let contadorcarrito = urlParams.get('contador');


mostrarProductos();

function mostrarProductos() {

  listaUsuarios.map((usuario) => {

    usuario.carrito.map((carrito) => {
      cantidadTotal = cantidadTotal + carrito.cantidad;
      if (cantidadTotal == 0) {
        document.getElementById("carritoVacio").style.display = "initial";

      } else {
        document.getElementById("carritoVacio").style.display = "none";
      }
      carritoSuperior.innerHTML = `<i
    class="bi bi-cart-fill opcionNav carrito"></i><span
    class="badge translate-middle bg-danger ">${cantidadTotal || 0}</span>`;

      let detalle = document.getElementById('tablaCarritoInterna');
      detalle.innerHTML += `
    
    <th scope="col" class="ColorLetras">${carrito.nombre}</th>
    <th scope="col" class="ColorLetras">${carrito.precio}</th>
    <th scope="col" class="ColorLetras">${carrito.cantidad}</th>
    <th scope="col" class="ColorLetras">${carrito.precio * carrito.cantidad}</th>
    <th scope="col" class="ColorLetras">
    <button class="btn btn-danger btn-sm " id="botoneliminar" onclick="eliminar()">
    <span class="text-center">eliminar</span>
  </button></th>
    `;
    })

  })



}
window.eliminar = () => {
  let detalle = document.getElementById('tablaCarritoInterna');
  listaUsuarios.map((usuario) => {

    usuario.carrito.map((carrito) => {
      cantidadTotal = cantidadTotal + carrito.cantidad;

      let posicionProducto = usuario.carrito.findIndex(producto => producto.codigo === carrito.codigo)
      actualizarStock(carrito.cantidad, carrito.codigo);
      usuario.carrito.splice(posicionProducto, 1)
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
      detalle.removeChild(detalle.children[posicionProducto]);

    })

  })
}
function actualizarStock(cantidad, codigo) {
  let producto = listaProducto.find(pro => pro.codigo === codigo);
  let stockActualizado = producto.stock + cantidad;

  listaProducto.map(pro => {
    if (pro.codigo === codigo) {
      producto.stock = stockActualizado;

    }

  })
  localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
} 