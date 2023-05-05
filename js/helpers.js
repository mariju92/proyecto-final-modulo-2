export function validarNombreProducto(nombreProducto)
{
    let patron = /(^[A-Z a-z\s?]{10,50})$/
    if(patron.test(nombreProducto.value))
    {
        nombreProducto.classList.replace('is-invalid','is-valid');
        return true;
    }
        nombreProducto.classList.remove('is-valid');
        nombreProducto.classList.add('is-invalid');
        return false;
    
}

export function validarPrecio(precio){
    let patron = /^([3-9][0-9]{2}|[1-9][0-9]{3,})$/
    if(patron.test(precio.value))
    {
        precio.classList.replace('is-invalid','is-valid');
        return true;
    }
        precio.classList.remove('is-valid');
        precio.classList.add('is-invalid');
        return false;
}

export function validarDescripcion(descripcion)
{
    let patron = /(^[A-Z a-z\s?]{10,200})$/
    if(patron.test(descripcion.value))
    {
        descripcion.classList.replace('is-invalid','is-valid');
        return true;
    }
        descripcion.classList.remove('is-valid');
        descripcion.classList.add('is-invalid');
        return false;
    
}

export function validarURLImagen(imagen){
    let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/;
    if(patron.test(imagen.value)){
        imagen.classList.replace('is-invalid','is-valid');
        return true;
    }
        imagen.classList.remove('is-valid');
        imagen.classList.add('is-invalid');
        return false;

}

export function validarCategoria(categoria){
    if((categoria.value === 'Ropa' || categoria.value  === 'Mochila' || categoria.value === 'Poster' || categoria.value === 'Funko')){
        categoria.classList.replace('is-invalid','is-valid');
        return true;
    }
        categoria.classList.remove('is-valid');
        categoria.classList.add('is-invalid');
        return false;
    
}

export function validarStock(stock)
{
    if(stock.value>0)
    {
        stock.classList.replace('is-invalid','is-valid');
        return true;
    }
        stock.classList.remove('is-valid');
        stock.classList.add('is-invalid');
        return false;
    
}

export function esDestacado(destacado)
{
    if(destacado.checked == true)
    {
        destacado.value = true;
        return true
    }
    destacado.value = false;
    return false;
}


export function sumarioValidaciones(nombre,precio,descripcion,imagen,categoria,stock,destacado){
    let resumen = '';
    if(!validarNombreProducto(nombre))
    {
        resumen += 'El nombre del producto debe empezar con mayúscula contener entre 10 y 50 carácteres <br>';
    }
    if(!validarPrecio(precio)){
        resumen += 'El precio debe ser minimo de $300 <br>'
    }
    if(!validarDescripcion(descripcion))
    {
        resumen += 'La descripcion del producto debe tener entre 10 y 200 carácteres <br>';
    }
    if(!validarURLImagen(imagen))
    {
        resumen += 'La URL debe ser un formato válido (.jpg/.png/.gif) <br>'
    }
    if(!validarCategoria(categoria))
    {
        resumen += 'Seleccione una categoria <br>'
    }
    if(!validarStock(stock))
    {
        resumen += 'El minimo de Stock debe ser 1'
    }
    if(!esDestacado(destacado))
    {
        destacado.value = false;
    }
    if(resumen.length !== 0){
        return resumen;
    }
    else{
        console.log('todo bien')
        return '';
    }
}