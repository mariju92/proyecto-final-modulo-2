import Producto from "./claseProducto.js";
import Usuario from "./classUsuario.js";
let listaProductosCarrito = [];



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
//traigo los usuarios de localstorage
let listaUsuarios = localStorage.getItem("listaUsuarios");
if (!listaUsuarios) {
  listaUsuarios = []
} else {
  listaUsuarios = JSON.parse(listaUsuarios).map((usuario) =>
    new Usuario(
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.contrasenia,
      usuario.rol,
      usuario.carrito
    )
  )
}


const parametroCodigo = new URLSearchParams(window.location.search);


const productoBuscado = listaProducto.find((Producto) => Producto.codigo === parametroCodigo.get('codigo'));
actualizarCarritoSuperior();

let detalle = document.getElementById('SeccionDetalleProducto');
detalle.innerHTML = `<article class="pt-5 fw-bold">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#" class="text-dark">Inicio</a></li>
    <li class="breadcrumb-item active" aria-current="page"> ${productoBuscado.categoria}</li>
  </ol>
</nav>
</article>
<article class="container p-5  bg-black">
<aside class="row d-flex justify-content-center ">
  <div class="col-lg-6">
    <img
      src="${productoBuscado.imagen}"
      alt="" class="img-fluid ">
  </div>
  <div class="col-lg-6 px-3 px-lg-5 py-3 py-lg-0">
    <div class="col-12">
      <h2 class="text-light pb-2">${productoBuscado.nombre}</h2>
      <h2 class="text-warning pb-2">$ ${productoBuscado.precio}</h2>
      <div class="pb-3" id="carritoBoton">
        <i class="bi bi-check-circle-fill text-warning fs-5"><span class="text-light ps-3">EN STOCK ${productoBuscado.stock}</span></i>
      </div>
      <i class="bi bi-truck text-warning fs-5"><span class="text-light ps-3">Costo de envio: $1500</span></i><a href="/pages/error404" class="text-warning text-decoration-none fw-bold"></a>
      <div class="row py-3 py-lg-5 col-12" >
      
        
        <div id="botones">
        <button class="btn btn-primary" id="botonCarrito" onclick="SumarCarrito()">
          <i class="bi bi-cart-plus fw-bold fs-3"><span class="text-center">AGREGAR AL CARRITO</span></i>
        </button></div>
      </div>
    </div>
  </div>
</aside>
<aside class="row col-12">
  <div class="col-12 px-3 mt-md-3 mt-lg-5">
    <h2 class="colorDescripcion ">DESCRIPCION</h2>
    <p class="text-light fs-3">${productoBuscado.descripcion}</p>
  </div>
</aside>
</article>
<article class="bg-black my-3 ">
<div class="accordion accordion-flush acordionDetalles " id="accordionFlushExample">
  <div class="accordion-item acordionDetalles">
    <h2 class="accordion-header " id="flush-headingOne">
      <button class="accordion-button collapsed bg-black text-light " type="button" data-bs-toggle="collapse"
        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <span>INFORMACION</span>
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
      data-bs-parent="#accordionFlushExample">
      <div class="accordion-body text-light">
      LAS IMÁGENES SON DE CARÁCTER ILUSTRATIVO
      Somos Tucmanime store con una larga trayectoria en este rubro, compre con confianza-
      Envíos a todo el país.
      Ante cualquier duda consulte, estamos para informarte. 
      Stock disponible
      Podés realizar la compra sin problema, sí está publicado tenemos stock para enviarlo.</div>
    </div>
    
  
  <div class="accordion-item acordionDetalles">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed bg-black text-light " type="button" data-bs-toggle="collapse"
        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        <span>POLITICA DE DEVOLUCION Y REEMBOLSO</span>
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
      data-bs-parent="#accordionFlushExample">
      <div class="accordion-body text-light">
      CAMBIOS Y DEVOLUCIONES
      los cambios y devoluciones se realizan en un lapso maximo de 7 dias
      Si no te convence el producto por cualquier razón, puedes devolveerlo, y te reintegramos el 100% del dinero SIN HACER PREGUNTAS!!.

      </div>
  </div
  <div class="accordion-item acordionDetalles">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed bg-black text-light " type="button" data-bs-toggle="collapse"
        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <span>INFORMACION DEL ENVIO</span>
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
      data-bs-parent="#accordionFlushExample">
      <div class="accordion-body text-light">
      los envios se hace a traves de correo argentino al momento de ser despachado le llegara al mail un correo con el numero de seguimiento correspondiente.
    </div>
  </div>
</div>
</article>`;


let contadorcarrito = 1;

window.SumarCarrito = () => {

  productoBuscado.stock = productoBuscado.stock - 1;

  let carritoBoton = document.getElementById('carritoBoton');
  carritoBoton.innerHTML = `
<i class="bi bi-check-circle-fill text-warning fs-5"><span class="text-light ps-3">EN STOCK ${productoBuscado.stock}</span></i>
 `
  if (contadorcarrito >= 1) {
    if (contadorcarrito > 1) {
      contadorcarrito++;
    }

    let carritoBoton = document.getElementById('botones');
    carritoBoton.innerHTML = `<article class="pt-5 fw-bold">
<nav aria-label="breadcrumb">
<button id="menos-cantidad"  onclick="restar()" class="btn btn-danger">-</button><span id="cant" class="h1 text-white">1</span><button id='mas-cantidad'  onclick="sumar()" class="btn btn-info">+</button>
<button class="btn btn-primary" id="botonCarrito" onclick="carrito('${productoBuscado.codigo}')">
    <i class="bi bi-cart-plus fw-bold w-50"><span class="text-center">IR AL CARRITO</span></i>
  </button>
`
  } else if (contadorcarrito == 0) {
    carritoBoton = document.getElementById('botones');
    carritoBoton.innerHTML = `
    <button class="btn btn-primary" id="botonCarrito" onclick="sumarCarrito()">
    <i class="bi bi-cart-plus fw-bold fs-3"><span class="text-center">AGREGAR AL CARRITO</span></i>
  </button>`
  }

}

window.restar = () => {
  contadorcarrito--;
  document.getElementById("cant").innerHTML = contadorcarrito;
  productoBuscado.stock = productoBuscado.stock + 1;

  let carritoBoton = document.getElementById('carritoBoton');
  carritoBoton.innerHTML = `
<i class="bi bi-check-circle-fill text-warning fs-5"><span class="text-light ps-3">EN STOCK ${productoBuscado.stock}</span></i>
 `

  if (contadorcarrito > 1) {
    document.getElementById("mas-cantidad").style.display = "initial";

  } if (contadorcarrito == 0) {
    document.getElementById("menos-cantidad").style.display = "none";

  }


}

window.sumar = () => {
  contadorcarrito++;
  document.getElementById("cant").innerHTML = contadorcarrito;
  productoBuscado.stock = productoBuscado.stock - 1;

  let carritoBoton = document.getElementById('carritoBoton');
  carritoBoton.innerHTML = `
<i class="bi bi-check-circle-fill text-warning fs-5"><span class="text-light ps-3">EN STOCK ${productoBuscado.stock}</span></i>
 `
  if (productoBuscado.stock == 0) {
    document.getElementById("mas-cantidad").style.display = "none";

  }
  if (contadorcarrito >= 1) {
    document.getElementById("menos-cantidad").style.display = "initial";

  }
}


window.carrito = (codigo) => {
  guardarProductos();
  window.location.href = window.location.origin + '/pages/carrito.html?codigo=' + productoBuscado.codigo + '&contador=' + contadorcarrito
}

function guardarProductos() {
  // guardar los datos del carrito en el localStorage
  // Definir los datos del producto
  let productoEnCarrito = {
    codigo: productoBuscado.codigo,
    nombre: productoBuscado.nombre,
    precio: productoBuscado.precio,
    cantidad: contadorcarrito
  }

  listaUsuarios.map(usuario => {

    usuario.carrito.push(productoEnCarrito)
  })

  //guardamos el objeto en el array
  listaProductosCarrito.push(productoEnCarrito);
  // Guardar los datos del producto en el localStorage
  actualizarStock();

  localStorage.setItem('productoEnCarrito', JSON.stringify(listaProductosCarrito));
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

}
function actualizarStock() {
  let stockActualizado = productoBuscado.stock;

  listaProducto.map(producto => {
    if (producto.codigo === productoBuscado.codigo) {
      producto.stock = stockActualizado;

    }

  })
  localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
}
//CODIGO QUE MUESTRA LA CANTIDAD DE PRODUCTOS EN EL CARRITO DEL NAVBAR
function actualizarCarritoSuperior() {
  let cantidadTotal = 0;
  listaUsuarios.map(usuario => {
    usuario.carrito.map(carrito => {
      cantidadTotal = cantidadTotal + carrito.cantidad;
    })

  })
  carritoSuperior.innerHTML = `<i
  class="bi bi-cart-fill opcionNav carrito"></i><span
  class="badge translate-middle bg-danger ">${cantidadTotal}</span>`;

}









