let contenedorMensaje = document.getElementById("contenedorMensajeTablaVacia");

const mostrarMensajeTablaAdmin = (listaProducto) => {
  listaProducto.length <= 0
    ? (contenedorMensaje.innerHTML = `<h4 class="text-center py-5">No hay productos para mostrar</h4>`)
    : (contenedorMensaje.innerHTML = null);
};

export default mostrarMensajeTablaAdmin;
