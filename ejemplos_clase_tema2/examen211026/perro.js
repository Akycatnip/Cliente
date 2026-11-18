import { Animal } from "./animal.js";

export class Perro extends Animal {
  #nombre;
  #diasEsperando;
  #adoptado = false;
  #raza = "perro";

  constructor(nombre, diasEsperando, raza) {
    super(nombre, diasEsperando);
    this.#raza = raza;
  }

  ficha() {
    return `${super.ficha()} - ${this.#raza}`;
  }
}
