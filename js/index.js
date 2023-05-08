let listaProducto =
  JSON.parse(localStorage.getItem("listaProducto")) || [];



window.detalleProducto = (codigo) => {
  window.location.href = window.location.origin + '/pages/detalles.html?codigo=' + codigo;
}