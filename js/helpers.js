function validarNombreProducto(nombreProducto)
{
    let patron = /(^[A-Z]{1}[a-z]{9,49})/
    if(patron.test(nombreProducto))
    {
        return true;
    }
    else{
        return false;
    }
}

function validarPrecio(value){
    if(value>=300)
    {
        return true;
    }
    else{
        return false;
    }
}



export function sumarioValidaciones(nombre,precio){
    if(!validarNombreProducto(nombre))
    {
        console.log('todo mal');
        return false;
    }
    if(!validarPrecio(precio)){
        console.log('mal');
        return false;
    }
    else{
        console.log('todo bien')
        return '';
    }
}