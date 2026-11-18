import { Animal } from "./animal.js";
import { Refugio } from "./refugio.js";
import { fichas } from "./animales.js";


const refugio1 = new Refugio("Las Cuatro Patas", 6, "");
const lasFichas = fichas.map(
  (ficha) => new Animal(ficha.nombre, ficha.especie, ficha.diasEsperando),
);

for (const fichas of lasFichas) {
  refugio1.admitir(Animal);
}

const roco = new Animal("Roco", 25, "podenco");
console.log("La ficha de Roco: ", roco.ficha);
admitir(roco);

console.log("Resumen del Refugio. ", refugio1.resumen);

//mas de 90 dias esperando
const mas90 = fichas.filter((diasEsperando) => diasEsperando > 90);
console.log(mas90, " animales llevan más de 90 días esperando. ");

//lista de nombres
const lisNombres = lista.map((animalis) => animalis.nombre);
console.log("Los nombres de los animales del refugio son: ", lisNombres);
--------------------------------------------------------------------------------------------------------------------------------
//lista html

const lista = fruits =>
    fruits
        .map(fruit =>
            `<li>{$fruit}</li>`
        )
        .join('');