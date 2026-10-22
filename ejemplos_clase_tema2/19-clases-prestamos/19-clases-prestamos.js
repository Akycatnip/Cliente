const catalogo = [
  { titulo: "La sombra del viento", autor: "Ruiz Zafón", disponible: true },
  { titulo: "Nada", autor: "Laforet", disponible: false },
  { titulo: "El Jarama", autor: "Sánchez Ferlosio", disponible: true },
];

catalogo.filter((libro) => libro.disponible); // los que se pueden llevar
catalogo.map((libro) => libro.titulo); // solo los títulos
catalogo.find((libro) => libro.autor === "Laforet"); // la ficha entera

//Vamos a crear libros de la clase Libro
import { Libro } from "./libro.js";

const libroSombra = new Libro("La sombra del viento", "Ruiz", 2000);
const libroMedico = new Libro("El Medico", "autor", 2012);

console.log("LIBROS DE LA BIBLIOTECA");
console.log(libroSombra.resumen());
console.log(libroMedico.resumen());

//Vamos a cambiar una propiedad privada del objeto.

libroSombra.prestar();
console.log("Está prestado La sombra: ", libroSombra.estaPrestado());

//Object.keys
console.log(
  "\n Campos visibles del objeto: ",
  Object.keys(libroSombra).join(", "),
);
