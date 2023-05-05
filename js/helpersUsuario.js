
const nombre = document.querySelector("#nombreApellido");
const email = document.querySelector("#email");
const contrasenia = document.querySelector("#contrasenia");
const confirmarContrasenia = document.querySelector("#confirmarContrasenia");

 

function validarEmail(){
    const regExp= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regExp.test(email.value)){
        email.className = "form-control is-valid";
        return true
    } else{
        email.className ="form-control is-invalid";
        return false;
    }
}


function validarContrasenia(){
    const regExp= /^.{4,}$/;
    if(regExp.test(contrasenia.value)){
        contrasenia.className = "form-control is-valid";
        return true
    } else{
        contrasenia.className ="form-control is-invalid";
        return false;
    }
}

function validarNombre(){
    const regExp= /^.{3,}$/;
    if(regExp.test(nombre.value)){
        nombre.className = "form-control is-valid";
        return true
    } else{
        nombre.className ="form-control is-invalid";
        return false;
    }
}
function validarConfirmacionContrasenia(){
  if ( confirmarContrasenia.value === contrasenia.value){
    confirmarContrasenia.className = "form-control is-valid";
    return true
  } else{
    confirmarContrasenia.className ="form-control is-invalid";
    return false;
  }
}


export function sumarioValidaciones (){
    validarConfirmacionContrasenia();
    validarContrasenia();
    validarEmail();
    validarNombre();
    if((validarNombre() && validarEmail() && validarContrasenia() && validarConfirmacionContrasenia())){
        return  true
    } else{
        return false
    }
}