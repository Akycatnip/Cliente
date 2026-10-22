/**
 * @author Marta
 */

/*1. sumar(a, b)
   - Descripción: devuelve la suma de dos números.
   - Ejemplo: `sumar(2, 3) // 5`
   - Casos: soportar números negativos, 0. Si falta un parámetro tratarlo como 0.*/
const sumar = (a, b) => a + b;

/*2. restar(a, b)
   - Descripción: devuelve a - b.
   - Ejemplo: `restar(5, 2) // 3`*/
const restar = (a, b) => a - b;

/*3. multiplicar(a, b)
   - Descripción: devuelve el producto de dos números.
   - Ejemplo: `multiplicar(4, 3) // 12`*/
const multiplicar = (a, b) => a * b;

/*
4. esPar(num)
   - Descripción: true si `num` es par, false en caso contrario.
   - Ejemplo: `esPar(4) // true`, `esPar(3) // false`*/

const esPar = (num) => (num % 2 == 0 ? true : false);

/*
5. potencia(base, exponente = 2)
   - Descripción: devuelve base elevado a exponente. Por defecto exponente = 2.
   - Ejemplo: `potencia(3) // 9`, `potencia(2, 3) // 8`*/

const potencia = (base, exponente = 2) => base ** exponente;

/*6. factorial_recursivo(n)
   - Descripción: devuelve el factorial de n. Implementación recursiva.
   - Ejemplo: `factorial(5) // 120`
   - Casos: definir comportamiento para n <= 0. Para n no entero puedes lanzar error.*/
const factorial = (n) =>
  !Number.isInteger(n)
    ? (() => {
        throw Error("Debe ser un entero");
      })()
    : n <= 0
      ? 1
      : n * factorial(n - 1);

/*7. factorial_iterativo(n)
   - Descripción: devuelve el factorial de n. Implementación iterativa.
   - Ejemplo: `factorial(6) // 720`
   - Casos: definir comportamiento para n <= 0. Para n no entero puedes lanzar error.*/

const factorialIterativo = (n) => {
  if (!Number.isInteger(n)) throw Error("Debe ser un entero");
  let resultado = 1;
  for (let i = 2; i <= n; i++) resultado *= i;
  return resultado;
};
/*8. encontrarMaximo(arr)
   - Descripción: recibe un array de números y devuelve el valor máximo.
   - Ejemplo: `encontrarMaximo([3,5,7,2]) // 7`
   - Casos: array vacío => undefined o lanzar error (documentar).*/
const encontrarMaximo = (arr) =>
  arr.length
    ? [...arr].sort((a, b) => a - b).at(-1) //con el spread se separan los elementos
    : undefined;

/*
8. obtenerNombreCompleto(persona)
   - Descripción: recibe un objeto con propiedades `nombre` y `apellido` y devuelve el nombre completo: `${nombre} ${apellido}`.
   - Ejemplo: `obtenerNombreCompleto({nombre: 'Sinforosa', apellido: 'Martínez'}) // 'Sinforosa Martínez'`*/

const obtenerNombreCompleto = (persona) =>
  `${persona.nombre} ${persona.apellido}`;
console.log(
  obtenerNombreCompleto({
    nombre: "Sinforosa",
    apellido: "Martínez",
  }),
);

/*9. generarCredenciales(persona)
   - Descripción: genera un objeto `{ email, password }`. Requisitos básicos:
     - email: formar a partir del nombre y apellidos y dominio `@g.educaand.es` (limpiar tildes y espacios).
     - password: contraseña aleatoria de al menos 8 caracteres que incluya mayúscula, minúscula, número y carácter especial.
   - Ejemplo: `{ email: 'juan.perez@g.educaand.es', password: 'A1b!cD34' }`*/

const generarCredenciales = (persona) => {
  const email =
    `${persona.nombre}.${persona.apellido}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "") + "@g.educaand.es";

  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
  const password =
    "Aa1!" +
    Array.from(
      { length: 4 },
      () => caracteres[Math.floor(Math.random() * caracteres.length)],
    ).join("");

  return { email, password };
};

/*10. invertirString(str)
    - Descripción: devuelve la cadena invertida.
    - Ejemplo: `invertirString('Qué bonita está la luna') // 'anul al etsab anitob éuQ'`*/

const invertirString = (str) => str.split("").reverse().join("");

/*11. capitalizarPrimeraLetra(str)
    - Descripción: capitaliza la primera letra de cada palabra en la frase.
    - Ejemplo: `capitalizarPrimeraLetra('hola mundo') // 'Hola Mundo'`*/

const capitalizarPrimeraLetra = (str) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();
//slice es como substring

/*12. contarVocales(str)
    - Descripción: cuenta las vocales (incluye vocales con tilde y ü) en una cadena.
    - Ejemplo: `contarVocales('pingüino') // 4`*/

const contarVocales = (str) =>
  [...str.toLowerCase()].filter((vocales) =>
    "aeiou" //filtro solo las vocales
      .includes(vocales),
  ).length; //cuenta cuantas hay

/*13. aSnakeCase(str)
    - Descripción: convierte una frase a snake*case, elimina caracteres no alfanuméricos (excepto *).
    - Ejemplo: `aSnakeCase('Hola Mundo!') // 'hola_mundo'`*/

const aSnakeCase = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9áéíóúüñ\s]/gi, "")
    .replace(/\s+/g, "_");
/*replace(/[^a-z0-9áéíóúüñ\s]/gi, "") → elimina los caracteres que no sean letras, números o espacios.
replace(/\s+/g, "_") → sustituye uno o varios espacios por _.*/
//Lo del asterisco no se hacerlo

/*14. aCamelCase(str)
    - Descripción: convierte una frase a camelCase.
    - Ejemplo: `aCamelCase('hola mundo ejemplo') // 'holaMundoEjemplo'`*/

const aCamelCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((palabra, indice) =>
      indice ? palabra[0].toUpperCase() + palabra.slice(1) : palabra,
    )
    .join("");

/*15. aFicheroPython(str)
    - Descripción: convierte una frase a formato válido para nombre de fichero en Python (snake_case, minúsculas, sin caracteres especiales).
    - Ejemplo: `aFicheroPython('Mi Primer Fichero.py') // 'mi_primer_fichero.py'`*/
const aFicheroPython = (str) =>
  aSnakeCase(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") + ".py";

/*16. resumirTexto(texto)
    - Descripción: si `texto` tiene más de 10 caracteres, devuelve los primeros 10 seguidos de `...`; si no, devuelve `texto` completo.
    - Ejemplo: `resumirTexto('12345678901') // '1234567890...'`*/
const resumirTexto = (texto) =>
  texto.length > 10 ? texto.slice(0, 10) + "..." : texto;

/*Practica con arrays (usar map, filter, reduce cuando proceda) y objetos
Crear un array con los cuadrados de un array de números (usar `potencia` o map).*/

const numeros = [3, 5, 7, 2, 8, 10];
const cuadrados = numeros.map((numero) => numero ** 2);

//Crear un array con los dobles (usar `multiplicar`).

const dobles = numeros.map((numero) => numero * 2);

//- Crear arrays con pares/impares (usar `esPar` y `filter`).
const pares = numeros.filter(esPar);
const impares = numeros.filter((numero) => !esPar(numero));

const persona = { nombre: "Manolo", apellido: "Pérez" };

const lenguajes = [
  {
    nombre: "JavaScript",
    creador: "Brendan Eich",
    anno: 1995,
    caracteristicas: ["dinámico", "débilmente tipado", "orientado a objetos"],
  },
  {
    nombre: "Python",
    creador: "Guido van Rossum",
    anno: 1991,
    caracteristicas: ["dinámico", "fuertemente tipado", "multiparadigma"],
  },
  {
    nombre: "Java",
    creador: "James Gosling",
    anno: 1995,
    caracteristicas: [
      "estáticamente tipado",
      "orientado a objetos",
      "portátil",
    ],
  },
  {
    nombre: "C++",
    creador: "Bjarne Stroustrup",
    anno: 1985,
    caracteristicas: [
      "estáticamente tipado",
      "orientado a objetos",
      "alto rendimiento",
    ],
  },
  {
    nombre: "Ruby",
    creador: "Yukihiro Matsumoto",
    anno: 1995,
    caracteristicas: ["dinámico", "orientado a objetos", "scripting"],
  },
  {
    nombre: "Go",
    creador: "Robert Griesemer, Rob Pike, Ken Thompson",
    anno: 2009,
    caracteristicas: ["estáticamente tipado", "concurrencia", "sencillo"],
  },
  {
    nombre: "Rust",
    creador: "Graydon Hoare",
    anno: 2010,
    caracteristicas: [
      "estáticamente tipado",
      "seguridad de memoria",
      "alto rendimiento",
    ],
  },
];
//- - Mapear objetos para obtener propiedades (por ejemplo, `lenguajes.map(l => l.nombre)`)
const obtenerNombre = lenguajes.map((lenguaje) => lenguaje.nombre);
const obtenerCreador = lenguajes.map((lenguaje) => lenguaje.creador);
const obtenerAnno = lenguajes.map((lenguaje) => lenguaje.anno);
const obtenerCaracteristicas = lenguajes.map(
  (lenguaje) => lenguaje.caracteristicas,
);

//- Convierte el mapeo anterior en una cadena con los nombres separados por comas.

const obtenerNombreStr = lenguajes
  .map((lenguaje) => lenguaje.nombre)
  .join(", ");
const obtenerCreadorStr = lenguajes
  .map((lenguaje) => lenguaje.creador)
  .join(", ");
const obtenerAnnoStr = lenguajes.map((lenguaje) => lenguaje.anno).join(", ");

const obtenerCaracteristicasStr = lenguajes
  .flatMap((l) => l.caracteristicas) // para arrays de array
  .join(", ");

//- Filtrar arrays de objetos (por ejemplo, lenguajes creados antes de 2000).
const antes2000 = lenguajes.filter((lenguaje) => lenguaje.anno < 2000);

const personas = [
  { nombre: "Anacleta", apellido: "García" },
  { nombre: "Luisito", apellido: "Martínez" },
];

//- Crear una cadena con los nombres y apellidos de las personas separados por comas.
const nombreApellido = personas
  .map((persona) => `${persona.nombre} ${persona.apellido}`)
  .join(", ");

//- Encontrar el número máximo en un array (usar `encontrarMaximo` o reduce).
const encontrarMaximoBis = (numeros) =>
  numeros.length
    ? [...numeros].sort((a, b) => a - b).at(-1) //con el spread se separan los elementos
    : undefined;

//con reduce
const encontrarMaximoRed = (numeros) =>
  numeros.length
    ? numeros.reduce((max, numero) => (numero > max ? numero : max))
    : undefined;

//- Contar el total de vocales en un array de strings (usar `contarVocales` y reduce).

const arrStr = [
  "hola",
  "JavaScript",
  "perro",
  "programacion",
  "casa",
  "desarrollo",
  "gato",
  "ordenador",
  "web",
  "codigo",
];

const totalVocales = arrStr.reduce((total, str) => total + contarVocales(str));

//- Obtener un array con los lenguajes que tienen "tipado" en sus características (usar filter).

const tienenTipado = lenguajes.filter(
  (lenguaj) =>
    lenguaj.caracteristicas.some((carac) => carac.includes("tipado")), //algunos incluyen tipado
);

//- Crear un array con los nombres de los lenguajes de programación
const lenProg = (lenguajes) => lenguajes.map((lenguaje) => lenguaje.nombre);

// Crear un array con los factoriales de los números

const factNum = (numeros) => numeros.map(factorial);

//- Crear un array con los nombres de las personas que tienen nombre con más de 5 letras
const nomMas5 = (personas) =>
  personas.filter((p) => p.nombre.length > 5).map((p) => p.nombre);

//- Crear un array con los lenguajes que son dinámicos

const esDinamico = (lenguajes) =>
  lenguajes.filter((l) => l.caracteristicas.includes("dinámico"));

//- Crear un array con los lenguajes que tienen más de 3 características
const masDe3 = (lenguajes) =>
  lenguajes.filter((l) => l.caracteristicas.length > 3);
