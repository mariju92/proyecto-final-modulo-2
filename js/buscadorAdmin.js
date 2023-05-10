let buscador = document.getElementById('buscador');

const habilitarDeshabilitarBuscador = (listaProducto) => {
  listaProducto.length <= 0
    ? buscador.setAttribute('disabled', '')
    : buscador.removeAttribute('disabled');
};

export default habilitarDeshabilitarBuscador;
