export class Refugio {
  #nombre;
  #plazas;
  #acogidos = [];

  constructor(nombre, plazas) {
    this.#nombre = nombre;
    this.#plazas = plazas;
  }

  admitir(Animal) {
    if (this.#plazas > 0) {
      this.#acogidos.pop(Animal);
    } else {
      return false;
    }
  }
  cuantos() {
    return this.acogidos.length;
  }
  acogidos() {
    return (acogidos2 = [...this.#acogidos]);
  }
  porEspera() {}
  resumen() {
    return `${this.#nombre} - ${this.cuantos()} - ${this.#plazas}`;
  }
}
