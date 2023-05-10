export default class Usuario {
  #id;
  #nombre;
  #email;
  #contrasenia;
  #rol;
  #carrito;
  constructor(id = uuidv4(), nombre, email, contrasenia, rol, carrito) {
    this.#id = id;
    this.#nombre = nombre;
    this.#email = email;
    this.#contrasenia = contrasenia;
    this.#rol = rol;
    this.#carrito = carrito;
  }

  get id() {
    return this.#id;
  }

  set id(valor) {
    this.#id = valor;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(valor) {
    this.#nombre = valor;
  }

  get email() {
    return this.#email;
  }

  set email(valor) {
    this.#email = valor;
  }

  get contrasenia() {
    return this.#contrasenia;
  }

  set contrasenia(valor) {
    this.#contrasenia = valor;
  }

  get rol() {
    return this.#rol;
  }

  set rol(valor) {
    this.#rol = valor;
  }
  get carrito() {
    return this.#carrito;
  }

  set carrito(valor) {
    this.#carrito = valor;
  }

  //stringify accede a este metodo
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      email: this.#email,
      contrasenia: this.#contrasenia,
      rol: this.#rol,
      carrito: this.#carrito,
    };
  }
}
