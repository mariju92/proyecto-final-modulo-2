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
    </div >
    `;
}

function crearCardProductoDestacado(producto) {
  let grilla = document.querySelector("#productoCarrouselGrande");
  if (producto.destacado === true) {
    grilla.innerHTML += `
    < div class="" >
      <div class="card border-0 m-2">
        <a href="./pages/error404.html">
          <img class="card-img-top border-1 bordeNaranja" src="${producto.imagen}" alt="${producto.nombre}">
        </a>
        <div class="card-body colorDegradadoOrizontal">
          <a href="./pages/error404.html" class="text-decoration-none">
            <h4 class="card-title text-white text-center"><b>${producto.nombre}</b></h4>
            <h5 class="colorNaranja text-center"><b>$${producto.precio}</b></h5>
          </a>
        </div>
      </div>
    </div >
    `;
  }

}

window.detalleProducto = (codigo) => {
  window.location.href = window.location.origin + '/pages/detalles.html?codigo=' + codigo;
}