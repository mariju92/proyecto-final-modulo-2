import Producto from './claseProducto.js';

const btnAgregar = document.getElementById('botonAgregar');
const modalProducto = new bootstrap.Modal(document.getElementById('modalAgregarProducto'));

btnAgregar.addEventListener('click',mostrarModalProducto)

function mostrarModalProducto(){
    modalProducto.show()
}