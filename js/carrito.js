const queryString = window.location.search;
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];
const urlParams = new URLSearchParams(queryString);
let producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

let contadorcarrito = urlParams.get('contador');
if (contadorcarrito >= 1) {
  document.getElementById("carritoVacio").style.display = "none";
}
function cargarProducto(e) {
  e.preventDefault();
  if (estadoProducto) {
    crearProducto();
  }
  else {
    actualizarProducto();
  }


}

// guardar los datos del carrito en el localStorage
// Definir los datos del producto
let productoEnCarrito = {
  codigo: producto.codigo,
  nombre: producto.nombre,
  precio: producto.precio,
  contadorcarrito: contadorcarrito
}

// Guardar los datos del producto en el localStorage
localStorage.setItem('productoEnCarrito', JSON.stringify(productoEnCarrito));

// Recuperar los datos del producto del localStorage
let productoGuardado = localStorage.getItem('productoEnCarrito');

// Convertir la cadena JSON de vuelta a un objeto JavaScript
let datosGuardados = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

carritoSuperior.innerHTML = `<i
class="bi bi-cart-fill opcionNav carrito"></i><span
class="badge translate-middle bg-danger ">${datosGuardados.contadorcarrito || 0}</span>`;

let detalle = document.getElementById('tablaCarrito');
detalle.innerHTML += `
<tbody><th scope="col" class="ColorLetras">${datosGuardados.codigo}</th>
<th scope="col" class="ColorLetras">${datosGuardados.nombre}</th>
<th scope="col" class="ColorLetras">${datosGuardados.precio}</th>
<th scope="col" class="ColorLetras">${datosGuardados.contadorcarrito}</th>
<th scope="col" class="ColorLetras">${datosGuardados.precio * datosGuardados.contadorcarrito}</th></tbody>
<tfoot>
<tr id="footer-carrito">
  
</tr>
</tfoot>`;

