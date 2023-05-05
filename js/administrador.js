import Producto from './claseProducto.js';
import { sumarioValidaciones, validarNombre } from "./helpers.js";


const nombreProducto = document.getElementById('nombre');
const precio = document.getElementById('precio');
const descripcion = document.getElementById('descripcion');
const imagen = document.getElementById('imagen');
const categoria = document.getElementById('categoria');
const stock = document.getElementById('stock');
const btnAgregar = document.getElementById('botonAgregar');
const modalProducto = new bootstrap.Modal(document.getElementById('modalAgregarProducto'));
const formularioProducto = document.getElementById('formAdministrarProducto');
const msjError = document.getElementById('msjError');

btnAgregar.addEventListener('click',mostrarModalProducto)
formularioProducto.addEventListener('submit',crearProducto)

let listaProducto = [];

function mostrarModalProducto(){
    modalProducto.show()
}

function crearProducto(e){
    e.preventDefault()
    let sumario = sumarioValidaciones(nombreProducto.value,precio.value,descripcion.value,imagen.value,categoria.value,stock.value);
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
          stock.value
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
        },3000)
        msjError.style.display = 'block'
    }
}

function limpiarFormulario()
{
    formularioProducto.reset()
}

nombreProducto.addEventListener('keyup', () => validarNombre(nombreProducto));
