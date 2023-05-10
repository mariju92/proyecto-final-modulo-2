import Producto from "./claseProducto.js";
import Usuario from "./classUsuario.js";
let listaProductosCarrito = [];
let cantidadTotal = 0;

const carritoSuperior = document.querySelector("#btnCarrito")

let listaProducto = localStorage.getItem(`listaProducto`);
if (!listaProducto) {
  listaProducto = [];
} else {
  listaProducto = JSON.parse(listaProducto).map(
    (producto) =>
      new Producto(
        producto.codigo,
        producto.nombre,
        producto.precio,
        producto.categoria,
        producto.imagen,
        producto.descripcion,
        producto.stock,
        producto.destacado
      )
  );
}

//traigo los usuarios de localstorage
let listaUsuarios = localStorage.getItem("listaUsuarios");
if (!listaUsuarios) {
  listaUsuarios = []
} else {
  listaUsuarios = JSON.parse(listaUsuarios).map((usuario) =>
    new Usuario(
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.contrasenia,
      usuario.rol,
      usuario.carrito
    )
  )
}
let usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let producto = listaProducto.find((Producto) => Producto.codigo === urlParams.get('codigo'));

let contadorcarrito = urlParams.get('contador');


mostrarProductos();

function mostrarProductos() {


    usuarioLogueado.carrito.map((carrito) => {
      cantidadTotal = cantidadTotal + carrito.cantidad;
      if (cantidadTotal == 0) {
        document.getElementById("carritoVacio").style.display = "initial";

      } else {
        document.getElementById("carritoVacio").style.display = "none";
      }
      carritoSuperior.innerHTML = `<i
    class="bi bi-cart-fill opcionNav carrito"></i><span
    class="badge translate-middle bg-danger ">${cantidadTotal || 0}</span>`;

      let detalle = document.getElementById('tablaCarritoInterna');
      detalle.innerHTML += `
    
    <th scope="col" class="ColorLetras">${carrito.nombre}</th>
    <th scope="col" class="ColorLetras">${carrito.precio}</th>
    <th scope="col" class="ColorLetras">${carrito.cantidad}</th>
    <th scope="col" class="ColorLetras">${carrito.precio * carrito.cantidad}</th>
    <th scope="col" class="ColorLetras">
    <button class="btn btn-danger btn-sm " id="botoneliminar" onclick="eliminar()">
    <span class="text-center">eliminar</span>
  </button>
  <a class="btn btn-primary btn-sm" href="./error404.html"> Comprar <a/>
    </th>
  `
  
    ;
    })
  

  }

  window.eliminar = () => {
    let detalle = document.getElementById('tablaCarritoInterna');
    let posicionProducto
  
    for(let i=0; i < usuarioLogueado.carrito.length; i++){
      for(let j=0; j < listaProducto.length; j++){
        if(listaProducto[j].codigo === usuarioLogueado.carrito[i].codigo){
          posicionProducto = i
        }
        listaProducto.map(producto=>{
          if(producto.codigo === usuarioLogueado.carrito[i].codigo ){
            producto.stock = producto.stock + usuarioLogueado.carrito[i].cantidad
            localStorage.setItem('listaProducto',JSON.stringify(listaProducto))
        }
        
        })
      }
    }
   

         console.log("posicion: "+ posicionProducto)
         cantidadTotal = cantidadTotal + usuarioLogueado.carrito.cantidad;
        
         usuarioLogueado.carrito.pop(posicionProducto)
         sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
         detalle.removeChild(detalle.children[posicionProducto]);
         actualizarCarritoSuperior()
      
  
  }
  // function actualizarStock() {
  //   let producto = listaProducto.find(pro => pro.codigo === codigo);
  //   let stockActualizado = producto.stock + cantidad;
  
  //   listaProducto.map(pro => {
  //     if (pro.codigo === codigo) {
  //       producto.stock = stockActualizado;
  
  //     }
  
  //   })
  //   localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
  // } 

// window.eliminar = () => {
//   let detalle = document.getElementById('tablaCarritoInterna');
//     let cantidadTotal = 0
//     let posicionProducto ;
//      usuarioLogueado.carrito[0].codigo
//     console.log(usuarioLogueado.carrito)
//     for(let i = 0; i < listaProducto.length; i++){
//       let codigoAComparar = usuarioLogueado.find((usuarioCarrito)=>{
//         return usuarioCarrito.codigo == listaProducto[i].codigo
//       })
//       console.log(listaProducto[i].codigo)
//       console.log(codigoAComparar)
//       if(listaProducto[i].codigo == codigoAComparar ){
//         console.log("son iguales")
//         posicionProducto = i
//         console.log("posision: " + posicionProducto)
//       }
//     }
        
//       actualizarStock(cantidadTotal);
//       console.log("posision: " + posicionProducto)
//       debugger
//       detalle.removeChild(detalle.children[posicionProducto]);
//       usuarioLogueado.carrito.splice(posicionProducto, 1)
//       cantidadTotal = cantidadTotal + usuarioLogueado.carrito.cantidad;
//       carritoSuperior.innerHTML = `<i
//       class="bi bi-cart-fill opcionNav carrito"></i><span
//       class="badge translate-middle bg-danger ">${cantidadTotal || 0}</span>`;
    
//     sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));


//   }

//  function actualizarStock() {
  
//    for(let i=0; i < usuarioLogueado.carrito.length; i++){
//     for(let j=0; j < listaProducto.length; j++){
//       if(listaProducto[j].codigo === usuarioLogueado.carrito[i].codigo){
//         posicionProducto = i
//       }
//     }
//   }
//    localStorage.setItem('listaProducto',JSON.stringify(listaProducto))
  

//  } 


//CODIGO QUE MUESTRA LA CANTIDAD DE PRODUCTOS EN EL CARRITO DEL NAVBAR
function actualizarCarritoSuperior() {
  let cantidadTotal = 0;
  if(usuarioLogueado){
    usuarioLogueado.carrito.map((carrito) => {
      cantidadTotal = cantidadTotal + carrito.cantidad;
      carritoSuperior.innerHTML = `<i
    class="bi bi-cart-fill opcionNav carrito"></i><span
    class="badge translate-middle bg-danger ">${cantidadTotal || 0}</span>`;
  
  })
}
}
  