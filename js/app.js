document.addEventListener("keyup", function(e) {
  if (e.target.matches("#buscador")) {
    let buscador = e.target;
    let productos = document.querySelectorAll(".cardsProductos");
    let resultadosEncontrados = false;

    for (let i = 0; i < productos.length; i++) {
      let producto = productos[i];
      if (producto.textContent.toLowerCase().includes(buscador.value.toLowerCase())) {
        producto.classList.remove("filtro");
        resultadosEncontrados = true;
      } else {
        producto.classList.add("filtro");
      }
    }

    let seccionProductos = document.getElementById("seccionProductos");
    if (!resultadosEncontrados) {
      let mensaje = document.createElement("h4");
      mensaje.textContent = "No se encontraron productos.";
      mensaje.className = "text-center p-4"
      mensaje.id = "mensajeNoProducto";
      seccionProductos.innerHTML = "";
      seccionProductos.appendChild(mensaje);
    } else {
      let mensaje = document.getElementById("mensajeNoProducto");
      if (mensaje) {
        mensaje.remove();
      }
    }
    
  }
});