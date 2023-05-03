export default class Producto{
    #codigo;
    #nombre;
    #precio;
    #categoria;
    #imagen;
    #descripcion;
    #stock;
    #destacado
    constructor(codigo = uuidv4(),nombre,precio,categoria,imagen,descripcion,stock)
    {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#categoria = categoria;
        this.#imagen = imagen;
        this.#descripcion = descripcion;
        this.#stock = stock;
        this.#destacado = false;
    }

    get codigo(){
        return this.#codigo;
    }
    get nombre(){
        return this.#nombre;
    }
    get precio(){
        return this.#precio;
    }
    get categoria(){
        return this.#categoria;
    }
    get imagen(){
        return this.#imagen;
    }
    get descripcion(){
        return this.#descripcion;
    }
    get stock(){
        return this.#stock;
    }
    get destacado(){
        return this.#destacado;
    }

    set codigo(newCodigo){
        this.#codigo = newCodigo;
    } 
    set nombre(newNombre){
        this.#nombre = newNombre;
    } 
    set precio(newPrecio){
        this.#precio = newPrecio;
    } 
    set categoria(newCategoria){
        this.#categoria = newCategoria;
    } 
    set imagen(newImagen){
        this.#imagen = newImagen;
    } 
    set descripcion(newDescripcion){
        this.#descripcion = newDescripcion;
    } 
    set stock(newStock){
        this.#stock = newStock;
    }
    set destacado(newDestacado){
        this.#destacado = newDestacado;
    } 
}

