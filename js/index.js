let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];

//dibujar columnas
listaProducto.map((producto) => {
  crearColumna(producto);
});

function crearColumna(producto) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += `
    <aside class="col-12 col-md-4 col-lg-3 mb-3">
    <div class="card h-100" >
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.precio}</h5>
      </div>
      <div class='card-footer'>
      <button class="btn btn-primary" onclick="detalleProducto('${producto.codigo}')">detalle</button>
      </div>
    </div>
  </aside>
    `;
}
window.detalleProducto = (codigo) => {
  window.location.href = window.location.origin + '/pages/detalles.html?codigo=' + codigo
}