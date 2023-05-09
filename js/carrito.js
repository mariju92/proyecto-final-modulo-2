const queryString = window.location.search;
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];
const urlParams = new URLSearchParams(queryString);
let producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

let contadorcarrito = urlParams.get('contador');
if (contadorcarrito >= 1) {
  document.getElementById("carritoVacio").style.display = "none";
}
carritoSuperior.innerHTML = `<i
class="bi bi-cart-fill opcionNav carrito"></i><span
class="badge translate-middle bg-danger ">${contadorcarrito || 0}</span>`;
let detalle = document.getElementById('tablaCarrito');
detalle.innerHTML += `
<tbody><th scope="col" class="ColorLetras">${producto.codigo}</th>
<th scope="col" class="ColorLetras">${producto.nombre}</th>
<th scope="col" class="ColorLetras">${producto.precio}</th>
<th scope="col" class="ColorLetras">${contadorcarrito}</th>
<th scope="col" class="ColorLetras">${producto.precio * contadorcarrito}</th></tbody>
<tfoot>
<tr id="footer-carrito">
  
</tr>
</tfoot>`;

