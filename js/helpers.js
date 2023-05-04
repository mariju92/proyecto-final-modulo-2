function cantidadDeCaracteres(elemento,min,max)
{
    if(elemento >= min && elemento <= max)
    {
        return true;
    }
    else{
        return false;
    }
}

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

function validarDescripcion(texto)
{
    if(texto.length > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function validarURLImagen(valor){
    let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
    if(patron.test(valor)){
        return true;
    }else{
        return false;
    }
}

function validarCategoria(texto){
    if(texto.length > 0 && (texto === 'Ropa' || texto  === 'Mochila' || texto === 'Poster' || texto === 'Funko')){
        return true;
    }
    else{
        return false;
    }
}

function validarStock(valor)
{
    if(valor>=0)
    {
        return true;
    }
    else{
        return false;
    }
}


export function sumarioValidaciones(nombre,precio,descripcion,imagen,categoria,stock){
    if(!validarNombreProducto(nombre))
    {
        console.log('todo mal');
        return false;
    }
    if(!validarPrecio(precio)){
        console.log('mal');
        return false;
    }
    if(!cantidadDeCaracteres(descripcion,10,200) && !validarDescripcion(descripcion))
    {
        return false;
    }
    if(!validarURLImagen(imagen))
    {
        return false;
    }
    if(!validarCategoria(categoria))
    {
        return false;
    }
    if(!validarStock(stock))
    {
        return false;
    }
    else{
        console.log('todo bien')
        return '';
    }
}