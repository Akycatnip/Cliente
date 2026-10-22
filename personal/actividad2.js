/** Obtener un array nuevo con los precios que superan los 20 € una vez aplicado el IVA del 21 %, redondeados a dos decimales.
 */

const precios = [12.5, 30, 8, 45.9, 19.99];

// function preciosIVA_extenso(precio) {
//   return precio * 1.21;
// }

const preciosAltos = precios
  .map((precio) => precio * 1.21)
  .filter((precio) => precio > 20)
  .map((precio) => Number(precio.toFixed(2))); //hay q usar number porque toFixed(2) devuelve texto

console.log("Precios altos: ", preciosAltos);

//otra manera de redondear que no lo pasa a texto
const precio = 36.298;

const resultado = Math.round(precio * 100) / 100;

console.log(resultado); // 36.3
console.log(typeof resultado); // "number"

//para devolver solo los nombres usamos map

const nombres = animales.map((animal) => animal.nombre);

console.log(nombres);

// ["Nero", "Kiwi"]
