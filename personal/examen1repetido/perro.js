import { Animal } from "./animal.js";

export class Perro extends Animal{

  #nombre;
  #especie = "perro";
  #diasEsperando;
  #adoptado = false;

  constructor(nombre, diasEsperando) {
    super.#nombre = nombre;
  
    this.#diasEsperando = diasEsperando;
  }

}