import Producto from "./claseProducto.js";

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

cargaInicial();

function cargaInicial(){
  //verificar si listaProductos tiene datos
  if(listaProducto.length > 0){
    //dibuja los datos en la tabla
    listaProducto.map((producto)=> crearCardProducto(producto))
  }
}

cargaInicialDestacado()
function cargaInicialDestacado(){
  //verificar si listaProductos tiene datos
  if(listaProducto.length > 0){
    //dibuja los datos en la tabla
    listaProducto.map((producto)=> crearCardProductoDestacado(producto))
  }
}


function crearCardProducto(producto) {
    let grilla = document.querySelector("#mostrarProductos");
    grilla.innerHTML += `
    <div class="col-9 col-md-4 col-lg-3 p-3 text-center cardsProductos">
      <div class="card border-0 m-2">
      <a href="./pages/detalles.html?codigo=${producto.codigo}">
          <img class="card-img-top border-1 bordeNaranja imgCard" src="${producto.imagen}" alt="${producto.nombre}">
        </a>
        <div class="card-body fondoNegro">
          <a href="./pages/error404.html" class="text-decoration-none">
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

function crearCardProductoDestacado(producto) {
  let grilla = document.querySelector("#productoCarrouselGrande");
  if(producto.destacado===true){
    grilla.innerHTML += `
    <div class="">
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
    </div>
  `;
  }
  
}

window.detalleProducto = (codigo) => {
    window.location.href = window.location.origin + './pages/detalles.html?codigo=' + codigo
}