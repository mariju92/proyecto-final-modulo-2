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

function cargaInicial() {
  //verificar si listaProductos tiene datos
  if (listaProducto.length > 0) {
    //dibuja los datos en la tabla
    listaProducto.map((producto) => crearCardProducto(producto))
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
<<<<<<< HEAD
  <div class="col-9 col-md-4 col-lg-3 text-center cardsProductos" data-categoria="${producto.categoria}">
    <div class="card border-1 m-2">
    <a href="./pages/detalles.html?codigo=${producto.codigo}" class="text-decoration-none">
        <img class="card-img-top border-1 bordeNaranja imgCard" src="${producto.imagen}" alt="${producto.nombre}">

        <div class="card-body fondoNegro ">
          <h3 class="card-title text-white my-3">${producto.nombre}</h3>
          <h3 class="colorNaranja pt-3">$${producto.precio}</h3>
        </div>
    </a>
       
      

=======
  <div class="col-12 col-md-4 col-lg-3 p-3 text-center cardsProductos" data-categoria="${producto.categoria}">
    <div class="card border-0 m-2 cardShadow ">
    <a href="./pages/detalles.html?codigo=${producto.codigo}">
        <img class="card-img-top border-1 bordeNaranja imgCard" src="${producto.imagen}" alt="${producto.nombre}">
      </a>
      <div class="card-body fondoNegro rounded-bottom-1">
        <a href="./pages/detalles.html?codigo=${producto.codigo}" class="text-decoration-none">
          <h4 class="card-title text-white espacioTitulo h3">${producto.nombre}</h4>
          <h5 class="colorNaranja h3 pb-5">$${producto.precio}</h5>
        </a>
      </div>
>>>>>>> 1b24b0c3fb881d737be1f156ad5387b74a41cdf8
    </div>
  </div>
  `;
}

function crearCardProductoDestacado(producto) {
  let grilla = document.querySelector("#productoCarrouselGrande");
  let destacados = grilla.querySelectorAll(".cardsProductosDestacado");
  
  if (producto.destacado === "Si" && destacados.length < 3) {
    grilla.innerHTML += `
      <div class="col-12 col-md-4 cardsProductosDestacado">
        <div class="card border-0 m-2 mx-4 my-4 cardShadowDestacado">
          <a href="./pages/detalles.html?codigo=${producto.codigo}">
            <img class="card-img-top border-1 bordeNaranja imgCardDestacado" src="${producto.imagen}" alt="${producto.nombre}">
          </a>
          <div class="card-body colorDegradadoOrizontal rounded-bottom-1">
            <a href="./pages/detalles.html?codigo=${producto.codigo}" class="text-decoration-none">
              <h4 class="card-title text-white text-center productoDestacadoh4"><b>${producto.nombre}</b></h4>
              <h5 class="colorNaranja text-center"><b>$${producto.precio}</b></h5>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

function filtrarPorCategoria(categoria) {
  let productos = document.querySelectorAll(".cardsProductos");
  
  productos.forEach((producto) => {
    producto.style.display = "block";
    if (categoria && producto.dataset.categoria !== categoria) {
      producto.style.display = "none";
    }
  });
}

let btnRopa = document.querySelector("#btnRopa");
let btnMochila = document.querySelector("#btnMochila");
let btnPoster = document.querySelector("#btnPoster");
let btnFunko = document.querySelector("#btnFunko");
let btnLimpiar = document.querySelector("#btnLimpiar");

btnRopa.addEventListener("click", () => filtrarPorCategoria("Ropa"));
btnMochila.addEventListener("click", () => filtrarPorCategoria("Mochila"));
btnPoster.addEventListener("click", () => filtrarPorCategoria("Poster"));
btnFunko.addEventListener("click", () => filtrarPorCategoria("Funko"));
btnLimpiar.addEventListener("click", () => filtrarPorCategoria(""));


let btnRopaM = document.querySelector("#btnRopaM");
let btnMochilaM = document.querySelector("#btnMochilaM");
let btnPosterM = document.querySelector("#btnPosterM");
let btnFunkoM = document.querySelector("#btnFunkoM");
let btnLimpiarM = document.querySelector("#btnLimpiarM");

btnRopaM.addEventListener("click", () => filtrarPorCategoria("Ropa"));
btnMochilaM.addEventListener("click", () => filtrarPorCategoria("Mochila"));
btnPosterM.addEventListener("click", () => filtrarPorCategoria("Poster"));
btnFunkoM.addEventListener("click", () => filtrarPorCategoria("Funko"));
btnLimpiarM.addEventListener("click", () => filtrarPorCategoria(""));


let btnRopaSM = document.querySelector("#btnRopaSM");
let btnMochilaSM = document.querySelector("#btnMochilaSM");
let btnPosterSM = document.querySelector("#btnPosterSM");
let btnFunkoSM = document.querySelector("#btnFunkoSM");
let btnLimpiarSM = document.querySelector("#btnLimpiarSM");

btnRopaSM.addEventListener("click", () => filtrarPorCategoria("Ropa"));
btnMochilaSM.addEventListener("click", () => filtrarPorCategoria("Mochila"));
btnPosterSM.addEventListener("click", () => filtrarPorCategoria("Poster"));
btnFunkoSM.addEventListener("click", () => filtrarPorCategoria("Funko"));
btnLimpiarSM.addEventListener("click", () => filtrarPorCategoria(""));




window.detalleProducto = (codigo) => {
  window.location.href = window.location.origin + './pages/detalles.html?codigo=' + codigo
}
