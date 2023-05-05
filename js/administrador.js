import Producto from './claseProducto.js';
import { sumarioValidaciones, validarCategoria, validarDescripcion, validarNombreProducto, validarPrecio, validarStock, validarURLImagen } from "./helpers.js";


const nombreProducto = document.getElementById('nombre');
const precio = document.getElementById('precio');
const descripcion = document.getElementById('descripcion');
const imagen = document.getElementById('imagen');
const categoria = document.getElementById('categoria');
const stock = document.getElementById('stock');
const destacado = document.getElementById('destacado');
const btnAgregar = document.getElementById('botonAgregar');
const modalProducto = new bootstrap.Modal(document.getElementById('modalAgregarProducto'));
const formularioProducto = document.getElementById('formAdministrarProducto');
const msjError = document.getElementById('msjError');

btnAgregar.addEventListener('click',mostrarModalProducto)
formularioProducto.addEventListener('submit',crearProducto)
let listaProducto = [];

function mostrarModalProducto(){
  modalProducto.show();
  limpiarFormulario();
}

function crearProducto(e){
    e.preventDefault()
    let sumario = sumarioValidaciones(nombreProducto,precio,descripcion,imagen,categoria,stock,destacado);
    if(sumario.length === 0)
    {
        
        console.log('creando');
        let nuevoProducto = new Producto(
          undefined,
          nombreProducto.value,
          precio.value,
          descripcion.value,
          imagen.value,
          categoria.value,
          stock.value,
          destacado.value
        )
        listaProducto.push(nuevoProducto);
        localStorage.setItem('listaProducto',JSON.stringify(listaProducto))
        modalProducto.hide();
        limpiarFormulario();
    }
    else{
      msjError.className = 'alert alert-danger mt-3';
        msjError.innerHTML = sumario;
        setTimeout(() => {
            msjError.style.display = 'none'
        },5000)
        msjError.style.display = 'block'
    }
}

function limpiarFormulario()
{
    formularioProducto.reset()
    const limpiarClaseSelect = document.querySelector('.selectFormularioProducto');
    limpiarClaseSelect.classList.remove('is-valid','is-invalid');
    const limpiarClase = document.querySelectorAll('.inputFormularioProducto');
    limpiarClase.forEach(input => {
      input.classList.remove('is-valid','is-invalid')});
}

nombreProducto.addEventListener('keyup', () => validarNombreProducto(nombreProducto));
precio.addEventListener('keyup', () => validarPrecio(precio))
descripcion.addEventListener('keyup', () => validarDescripcion(descripcion))
imagen.addEventListener('keyup', () => validarURLImagen(imagen))
categoria.addEventListener('change', () => validarCategoria(categoria))
stock.addEventListener('keyup', () => validarStock(stock))