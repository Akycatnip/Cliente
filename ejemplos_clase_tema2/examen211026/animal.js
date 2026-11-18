export class Animal {
  #nombre;
  #especie;
  #diasEsperando;
  #adoptado = false;

  constructor(nombre, especie, diasEsperando) {
    this.#nombre = nombre;
    this.#especie = especie;
    this.#diasEsperando = diasEsperando;
  }
  nombre() {
    return this.#nombre;
  }
  diasEsperando() {
    return this.#diasEsperando;
  }
  llevaMucho() {
    return this.#diasEsperando > 90;
  }
  ficha() {
    return `${this.#nombre} - ${this.#especie} - ${this.#diasEsperando}`;
  }
  adoptar() {
    return (this.#adoptado = true);
  }

  estaAdoptado() {
    if (adoptado == true) {
      return "Está adoptado. ";
    }
  }
}
