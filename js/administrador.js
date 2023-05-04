import Producto from './claseProducto.js';
import { sumarioValidaciones } from "./helpers.js";

const nombreProducto = document.getElementById('nombre');
const precio = document.getElementById('precio');
const descripcion = document.getElementById('descripcion');
const categoria = document.getElementById('categoria');
const stock = document.getElementById('stock');
const btnAgregar = document.getElementById('botonAgregar');
const modalProducto = new bootstrap.Modal(document.getElementById('modalAgregarProducto'));
const formularioProducto = document.getElementById('formAdministrarProducto');

btnAgregar.addEventListener('click',mostrarModalProducto)
formularioProducto.addEventListener('submit',crearProducto)

function mostrarModalProducto(){
    modalProducto.show()
}

function crearProducto(e){
    e.preventDefault()
    let sumario = sumarioValidaciones(nombreProducto.value,precio.value);
    if(sumario.length === 0)
    {
        
        console.log('creando')
        modalProducto.hide()
        formularioProducto.reset()
        
    }
    else{
    }
}

function limpiarFormulario()
{
    formularioProducto.reset()
}

(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.necesitaValidar')
    Array.from(forms).forEach(formulario => {
      formulario.addEventListener('submit', event => {
        if (!formulario.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        formulario.classList.add('was-validated')
      }, false)
    })
  })()