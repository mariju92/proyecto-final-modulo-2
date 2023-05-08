
const parametroCodigo = new URLSearchParams(window.location.search);
let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];
const productoBuscado = listaProducto.find((Producto) => Producto.codigo === parametroCodigo.get('codigo'));
let detalle = document.getElementById('SeccionDetalleProducto');
detalle.innerHTML = `<article class="pt-5 fw-bold">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#" class="text-dark">Inicio</a></li>
    <li class="breadcrumb-item active" aria-current="page"> ${productoBuscado.categoria}</li>
  </ol>
</nav>
</article>
<article class="bg-black">
<aside class="row">
  <div class="col-lg-6">
    <img
      src="${productoBuscado.imagen}"
      alt="" class="img-fluid p-5">
  </div>
  <div class="col-lg-6 p-5">
    <div class="col-12">
      <h2 class="text-light pb-4">${productoBuscado.nombre}</h2>
      <h2 class="text-warning pb-3">$ ${productoBuscado.precio}</h2>
      <div class="pb-3">
        <i class="bi bi-check-circle-fill text-warning fs-5"><span class="text-light ps-3">EN STOCK ${productoBuscado.stock}</span></i>
      </div>
      <i class="bi bi-truck text-warning fs-5"><span class="text-light ps-3">Costo de envio: $1500</span></i><a href="/pages/error404" class="text-warning text-decoration-none fw-bold"></a>
      <div class="row py-5 col-12 m-0">
        <div class="col-2 p-0">
          <input type="number" min="1" max="10" value="1" class="w-100 h-100" title="stock">
        </div>
        <button class="btn btn-primary" onclick="detalleProducto('${producto.codigo}')">
          <p class="text-center fs-3 fw-bold pt-2 ">COMPRAR</p>
        </button>
        <button class="btn btn-primary" onclick="detalleProducto('${producto.codigo}')">
          <i class="bi bi-cart-plus fw-bold fs-3"><span class="text-center">AGREGAR AL CARRITO</span></i>
        </button>
      </div>
    </div>
  </div>
</aside>
<aside class="row col-12">
  <div class="col-12 px-5">
    <h3 class="colorDescripcion">DESCRIPCION</h3>
    <p class="text-light">${productoBuscado.descripcion}</p>
  </div>
</aside>
</article>
<article class="bg-black my-5 ">
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

window.detalleProducto = (codigo) => {
  window.location.href = window.location.origin + '/pages/detalles.html?codigo=' + codigo
}