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

let listaProducto = localStorage.getItem('listaProducto');

if(!listaProducto)
{
  listaProducto = [];
}
else{
  listaProducto = JSON.parse(listaProducto).map(producto => new Producto(
    undefined,
    producto.nombre,
    producto.precio,
    producto.categoria,
    producto.imagen,
    producto.descripcion,
    producto.stock,
    producto.destacado
  ))
}

console.log(listaProducto)

cargaInicial()

function cargaInicial()
{
  if(listaProducto.length > 0)
  {
    listaProducto.map((producto, indice) => crearFila(producto,indice))
  }
}

function crearFila(producto,indice)
{
  let datosProducto = document.querySelector('tbody');

  datosProducto.innerHTML += `<tr>
  <th>${indice + 1}</th>
  <td>${producto.nombre}</td>
  <td>${producto.categoria}</td>
  <td>${producto.precio}</td>
  <td>${producto.stock}</td>
  <td>
    <button class=" btn bi bi-search btn-primary"></button>
    <button class=" btn bi bi-pencil btn-warning my-3 my-md-0"></button>
    <button class=" btn bi bi-x-lg btn-danger"></button>
  </td>
</tr>`
}

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
          categoria.value,
          imagen.value,
          descripcion.value,
          stock.value,
          destacado.value
        )
        listaProducto.push(nuevoProducto);
        localStorage.setItem('listaProducto',JSON.stringify(listaProducto))
        modalProducto.hide();
        let indicePro = listaProducto.length - 1;
        crearFila(nuevoProducto, indicePro)
        Swal.fire(
          'Producto Creado',
          'El producto ingresado fue creado correctamente',
          'success'
        )
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