const alumnado = [
  { nombre: "Ana", nota: 8.5 },
  { nombre: "Luis", nota: 4.0 },
  { nombre: "Marta", nota: 9.2 },
  { nombre: "Carlos", nota: 3.5 },
  { nombre: "Eva", nota: 7.0 },
];
/**Filtrar y transformar:** Obtener un nuevo array llamado `aprobadosMayusculas`
 * con los nombres en mayúsculas de los alumnos con `nota &gt;= 5.0`*/

const aprobadosMayusculas = alumnado
  .filter((alumno) => alumno.nota >= 5.0)
  .map((alumno) => alumno.nombre.toUpperCase());

console.log(aprobadosMayusculas);

const [primero, segundo, tercero] = alumnado;
console.log(alumnado[0]);
console.log(primero);

const productos = [
  { nombre: "Libro", precio: 15 },
  { nombre: "Ratón", precio: 12 },
  { nombre: "Teclado", precio: 35 },
];

const totalpro = productos.reduce(
  (acumulador, producto) => acumulador + producto.precio,
  0,
);
console.log("La suma de los productos es ", totalpro);

const estudiantesclase = [
  { nombre: "Ana", nota: 8 },
  { nombre: "Luis", nota: 4 },
  { nombre: "Marta", nota: 9 },
  { nombre: "Pedro", nota: 3 },
];

const aprobadoses = estudiantesclase.filter((alumno) => alumno.nota >= 5);

console.log("Los alumnos aprobados son: ", aprobadoses);

const notamedia = estudiantesclase.reduce(
  (acumulado, alumno) => acumulado + alumno.nota,
  0,
);
const mediaex = notamedia / estudiantesclase.length;
console.log("LA media de la clase es: ", mediaex);

// Nombres: ["Ana", "Marta"]
// Media: 8.5
