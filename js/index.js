let listaProducto =
    JSON.parse(localStorage.getItem("listaProducto")) || [];

//dibujar columnas
listaProducto.map((producto) => {
    crearColumna(producto);
});

function crearColumna(producto) {
    let grilla = document.querySelector("#mostrarProductos");
    grilla.innerHTML += `
    <div class="col-9 col-md-4 col-lg-3 p-3 text-center cardsProductos">
      <div class="card border-0 m-2"><a href="./pages/error404.html">
        <img class="card-img-top border-1 bordeNaranja imgCard" src="${producto.imagen}" alt="${producto.nombre}"></a>
        <div class="card-body fondoNegro"><a href="./pages/error404.html" class="text-decoration-none">
          <h4 class="card-title text-white espacioTitulo">${producto.nombre}</h4>
          <h5 class="colorNaranja">$${producto.precio}</h5>
          </a>
          <form class="container">
            <div class="input-group py-2 pe-3 pe-md-0 d-flex justify-content-center ">
              <button class="colorDegradadoOrizontal border-0 botonRedondo text-white" type="button">agregar al carrito</button>
            </div>
          </form>
        </div>
      </div>
    </div>


    
    `;
}

/*
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
  </aside> */
window.detalleProducto = (codigo) => {
    window.location.href = window.location.origin + '/pages/detalles.html?codigo=' + codigo
}