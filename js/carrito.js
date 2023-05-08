
const parametroCodigo = new URLSearchParams(window.location.search);
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];

const productoBuscado = listaProducto.find((Producto) => Producto.codigo === parametroCodigo.get('codigo'));
const contador = parametroCodigo.get('contador');
let detalle = document.getElementById('tablaCarrito');
detalle.innerHTML = `<thead>
<tr>
  <th scope="col" class="ColorLetras">#</th>
  <th scope="col" class="ColorLetras">Producto</th>
  <th scope="col" class="ColorLetras">Precio</th>
  <th scope="col" class="ColorLetras">Cantidad</th>
  <th scope="col" class="ColorLetras">Total</th>
</tr>
</thead>
<tbody><th scope="col" class="ColorLetras">${productoBuscado.nombre}</th>
<th scope="col" class="ColorLetras">${productoBuscado.nombre}</th>
<th scope="col" class="ColorLetras">${productoBuscado.precio}</th>
<th scope="col" class="ColorLetras">${contador}</th>
<th scope="col" class="ColorLetras">${productoBuscado.precio * contador}</th></tbody>
<tfoot>
<tr id="footer-carrito">
  <th scope="row" class="ColorLetras" colspan="5">
    Carrito vacío - comience a comprar!
  </th>
</tr>
</tfoot>`;
