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

export function validarNombre(input)
{
    console.log(input);
    let patron = /(^[A-Z]{1}[a-z]{9,49})/
    if(patron.test(input.value))
    {
        //input.classList.remove('is-invalid');
        //input.classList.add('is-valid');
        input.classList.replace('is-invalid','is-valid');
        return true;
    }
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    return false;
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
    let resumen = '';
    if(!validarNombreProducto(nombre))
    {
        resumen += 'El nombre del producto debe empezar con mayúscula contener entre 10 y 50 carácteres <br>';
    }
    if(!validarPrecio(precio)){
        resumen += 'El precio debe ser minimo de $300'
    }
    if(!cantidadDeCaracteres(descripcion,10,200) && !validarDescripcion(descripcion))
    {
        resumen += 'La descripcion del producto debe tener entre 10 y 200 carácteres<br>';
    }
    if(!validarURLImagen(imagen))
    {
        resumen += 'La URL debe ser un formato válido (.jpg/.png/.gif)'
    }
    if(!validarCategoria(categoria))
    {
        
    }
    if(!validarStock(stock))
    {
        
    }
    if(resumen.length !== 0){
        return resumen;
    }
    else{
        console.log('todo bien')
        return '';
    }
}