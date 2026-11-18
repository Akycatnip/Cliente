//quedarnos con los libros del html

const libros = [...document.querySelectorAll(".libro")]; //directamente convertido a array

//añadir una clase a elementos
libros[0].classList.add("destacado");

//podemos preguntarle a un elemento si tiene o no una clase

console.log("Destacado?", libros[0].classList.contains("destacado"));

//Mostrar las clases q tiene un elemento
console.log(libros[0].classList);

//quitar y alternar un estilo
console.log("Vamos a quitar una clase");
libros[0].classList.remove("destacado");

//con toogle alternamos una clase

console.log("toggle:", libros[0].classList.toggle("destacado")); //lo pone

console.log("toggle:", libros[0].classList.toggle("destacado")); //lo quita

//puedo acceder a un elemento por la clase que mi JS ha añadido
libros[1].classList.add("prestado");
libros[3].classList.add("prestado");

//podemos contarlos

console.log(
  "Libros prestados: ",
  document.querySelectorAll(".libro.prestado").length,
);

//varias clases a la vez

libros[2].classList.add("prestado", "destacado");

//cambiar el aspecto de todo el documento

document.body.classList.add("oscuro"); //modo oscuro
document.body.classList.remove("oscuro"); //quita modo oscuro

//podemos, pero no debemos, cambiar el HTML con style

libros[2].querySelector(".titulo").style.color = "pink";
libros[3].querySelector(".titulo").style.color = "green";
