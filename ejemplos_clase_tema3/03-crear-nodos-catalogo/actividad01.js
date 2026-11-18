//del html del ejemplo 2 nos quedamos con los libros prestados

//con un selector nos quedamos con los elementos que pertenevcen a libro y prestado
const librosPrestados = document.querySelectorAll("li.prestado .titulo");

//convertir el nodelist en un array
const titulosLibrosPrestados = [...librosPrestados].map((l) => l.textContent); //esto ya es un array de text content
console.log("Que contiene titulosLibrosPrestados", titulosLibrosPrestados);

//maneras de acceder a los objetos del DOM
// # para un id de CSS
// . para la clase
// etiqueta html

const elementoUL = document.querySelector("ul");
// const elementoULC = document.querySelector(#catalogo);
