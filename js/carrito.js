
const parametroCodigo = new URLSearchParams(window.location.search);
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];

const productoBuscado = listaProducto.find((Producto) => Producto.codigo === parametroCodigo.get('codigo'));
console.log(productoBuscado);
const contadorcarrito = parseInt(parametroCodigo.get('contador'));
console.log(contadorcarrito)
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
<tbody><th scope="col" class="ColorLetras">${productoBuscado.codigo}</th>
<th scope="col" class="ColorLetras">${productoBuscado.nombre}</th>
<th scope="col" class="ColorLetras">${productoBuscado.precio}</th>
<th scope="col" class="ColorLetras">${contadorcarrito}</th>
<th scope="col" class="ColorLetras">${productoBuscado.precio * contadorcarrito}</th></tbody>
<tfoot>
<tr id="footer-carrito">
  <th scope="row" class="ColorLetras" colspan="5">
    Carrito vacío - comience a comprar!
  </th>
</tr>
</tfoot>`;
