const queryString = window.location.search;
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];
const urlParams = new URLSearchParams(queryString);
const producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

const contadorcarrito = urlParams.get('contador');
console.log(queryString);
console.log(listaProducto);
console.log(urlParams.get('codigo'));
console.log(producto);
console.log(contadorcarrito);
carritoSuperior.innerHTML = `<i
class="bi bi-cart-fill opcionNav carrito"></i><span
class="badge translate-middle bg-danger ">${contadorcarrito}</span>`;

let detalle = document.getElementById('tablaCarrito');
detalle.innerHTML += `
<tbody><th scope="col" class="ColorLetras">${producto.codigo}</th>
<th scope="col" class="ColorLetras">${producto.nombre}</th>
<th scope="col" class="ColorLetras">${producto.precio}</th>
<th scope="col" class="ColorLetras">${contadorcarrito}</th>
<th scope="col" class="ColorLetras">${producto.precio * contadorcarrito}</th></tbody>
<tfoot>
<tr id="footer-carrito">
  <th scope="row" class="ColorLetras" colspan="5">
    Carrito vacío - comience a comprar!
  </th>
</tr>
</tfoot>`;
