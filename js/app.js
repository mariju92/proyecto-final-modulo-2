document.addEventListener("keyup", function(e) {
    if (e.target.matches("#buscador")) {
      let productos = document.querySelectorAll(".card");
      let resultadosEncontrados = false;
  
      for (let i = 0; i < productos.length; i++) {
        let minusculas = productos[i];
        if (minusculas.textContent.toLowerCase().includes(e.target.value)) {
          minusculas.classList.remove("filtro");
          resultadosEncontrados = true;
        } else {
          minusculas.classList.add("filtro");
        }
      }
  
      let seccionProductos = document.getElementById("seccionProductos");
      if (!resultadosEncontrados) {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron productos.";
        mensaje.id = "mensajeNoProducto";
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