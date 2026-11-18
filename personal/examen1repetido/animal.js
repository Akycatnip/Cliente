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
    if (this.#diasEsperando > 90) {
      return true;
    }
  }
  ficha() {
    return `${this.#nombre} - ${this.#especie} - ${this.#diasEsperando}`;
  }

  adoptar() {
    return (this.#adoptado = true);
  }

  estaAdoptado() {
    if (this.#adoptado == true) {
      return "Está adoptado. ";
    } else {
      return "No está adoptado.";
    }
  }
}
