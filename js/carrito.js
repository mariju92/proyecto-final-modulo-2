const queryString = window.location.search;
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];
const urlParams = new URLSearchParams(queryString);
const producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

const contadorcarrito = urlParams.get('contador');

let detalle = document.getElementById('tablaCarrito');
detalle.innerHTML += `
<tbody><th scope="col" class="ColorLetras"></th>
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
