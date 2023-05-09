import Producto from './claseProducto.js';
import { esDestacado, sumarioValidaciones, validarCategoria, validarDescripcion, validarNombreProducto, validarPrecio, validarStock, validarURLImagen } from "./helpers.js";

const codigo = document.getElementById('codigo');
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
formularioProducto.addEventListener('submit',cargarProducto)
nombreProducto.addEventListener('keyup', () => validarNombreProducto(nombreProducto));
precio.addEventListener('keyup', () => validarPrecio(precio))
descripcion.addEventListener('keyup', () => validarDescripcion(descripcion))
imagen.addEventListener('keyup', () => validarURLImagen(imagen))
categoria.addEventListener('change', () => validarCategoria(categoria))
stock.addEventListener('keyup', () => validarStock(stock))
destacado.addEventListener('change',() => esDestacado(destacado))

let listaProducto = localStorage.getItem('listaProducto');
let estadoProducto = true;
let titulo = document.getElementById('agregarProductoModalLabel');
let boton = document.getElementById('botonFormulario');
let datosProducto = document.querySelector('tbody');

if(!listaProducto)
{
  listaProducto = [];
}
else{
  listaProducto = JSON.parse(listaProducto).map(producto => new Producto(
    producto.codigo,
    producto.nombre,
    producto.precio,
    producto.categoria,
    producto.imagen,
    producto.descripcion,
    producto.stock,
    producto.destacado
  ))
}


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
  datosProducto.innerHTML += `<tr class='cardsProductos'>
  <th>${indice + 1}</th>
  <td>${producto.nombre}</td>
  <td>${producto.categoria}</td>
  <td>${producto.precio}</td>
  <td>${producto.stock}</td>
  <td>
    <button class=" btn bi bi-search btn-primary"></button>
    <button class=" btn bi bi-pencil btn-warning my-3 my-md-0" onclick="editarProducto('${producto.codigo}')"></button>
    <button class=" btn bi bi-x-lg btn-danger" onclick="borrarProducto('${producto.codigo}')"></button>
  </td>
</tr>`
}

function mostrarModalProducto(){
  estadoProducto = true;
  modalProducto.show();
  titulo.innerHTML = 'Crear Producto'
  boton.className = 'btn btn-primary';
  boton.innerHTML = 'Enviar'
  limpiarFormulario();
}

function cargarProducto(e){
  e.preventDefault();
  if(estadoProducto){
      crearProducto();
  }
  else{
      actualizarProducto();
  }
  
  
}

function crearProducto(){
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
        guardarLocalStorage();
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
    const limpiarClaseSelect = document.querySelectorAll('.selectFormularioProducto');
    limpiarClaseSelect.forEach(input => {input.classList.remove('is-valid','is-invalid')})
    const limpiarClase = document.querySelectorAll('.inputFormularioProducto');
    limpiarClase.forEach(input => {
      input.classList.remove('is-valid','is-invalid')});
}

function guardarLocalStorage()
{
  localStorage.setItem('listaProducto',JSON.stringify(listaProducto))
}

function limpiarTablaProducto(){
  datosProducto.innerHTML = '';
}

window.borrarProducto = (codigo) => {
  Swal.fire({
    title: '¿Esta seguro de borrar el producto?',
    text: "No podras revertirlo después de borrarlo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed){
    let posicionProducto = listaProducto.findIndex(producto => producto.codigo === codigo)
    listaProducto.splice(posicionProducto,1)
    guardarLocalStorage();
    datosProducto.removeChild(datosProducto.children[posicionProducto]);
    limpiarTablaProducto();
    cargaInicial();
    Swal.fire(
    'Se borro el producto',
    'El producto seleccionado fue eliminado correctamente',
    'success'
  )
}
})
}

window.editarProducto = (codigoUni) => {
  titulo.innerHTML = 'Editar Producto'
  boton.className = 'btn btn-warning';
  boton.innerHTML = 'Editar'
  const producto = listaProducto.find(producto => producto.codigo === codigoUni)
  modalProducto.show()
  codigo.value = producto.codigo;
  nombreProducto.value = producto.nombre;
  precio.value = producto.precio;
  categoria.value = producto.categoria;
  imagen.value = producto.imagen
  descripcion.value = producto.descripcion
  stock.value = producto.stock
  destacado.value = producto.destacado;
  estadoProducto = false;
}

function actualizarProducto(){
  let sumario = sumarioValidaciones(nombreProducto,precio,descripcion,imagen,categoria,stock,destacado);
  if(sumario.length === 0){
  let posicionProducto = listaProducto.findIndex(pro => pro.codigo === codigo.value)
  listaProducto[posicionProducto].nombre = nombreProducto.value;
  listaProducto[posicionProducto].precio = precio.value;
  listaProducto[posicionProducto].categoria = categoria.value;
  listaProducto[posicionProducto].imagen = imagen.value;
  listaProducto[posicionProducto].descripcion = descripcion.value;
  listaProducto[posicionProducto].stock = stock.value;
  listaProducto[posicionProducto].destacado = destacado.value;
  guardarLocalStorage();
  Swal.fire(
      "Producto Editado",
      "El producto elegido fue editado corrrectamente",
      "success"
  );
  datosProducto.children[posicionProducto].children[1].innerText = nombreProducto.value;
  datosProducto.children[posicionProducto].children[2].innerText = categoria.value;
  datosProducto.children[posicionProducto].children[3].innerText = precio.value;
  datosProducto.children[posicionProducto].children[4].innerText = stock.value;
  limpiarFormulario();
  modalProducto.hide();
  }
}

document.addEventListener("keyup", function(e) {
  if (e.target.matches("#inputBuscar")) {
    let productos = document.querySelectorAll(".tablaProductos");
    let resultadosEncontrados = false;

    for (let i = 0; i < productos.length; i++) {
      let palabra = productos[i];
      if (palabra.textContent.toLowerCase().includes(e.target.value.toLowerCase()) || palabra.textContent.toUpperCase().includes(e.target.value)) {
        palabra.classList.remove("filtro");
        resultadosEncontrados = true;
      } else {
        palabra.classList.add("filtro");
      }
    }

    let seccionProductos = document.getElementById("seccionProductos");
    if (!resultadosEncontrados) {
      let mensaje = document.createElement("h4");
      mensaje.textContent = "No se encontraron productos con ese nombre.";
      mensaje.className = "text-center p-4"
      mensaje.setAttribute('id','mensajeNoProducto')
      seccionProductos.innerHTML = "";
      seccionProductos.appendChild(mensaje);
    } else {
      let mensaje = document.getElementById("mensajeNoProducto");
      if (mensaje) {
        seccionProductos.innerHTML = "";
      }
    }
  }
});