const pedir = document.querySelector("#pedir");
const reiniciar = document.querySelector("#reiniciar");
const prestamos = document.querySelector("#prestamos");
const libros = [...document.querySelectorAll(".libro")];
const buscador = document.querySelector("#buscador");

//reaccionamos a un click

let cont_prestamos = 0;

pedir.addEventListener("click", () => {
  cont_prestamos++;
  prestamos.textContent = `Préstamos : ${cont_prestamos}`;
});

//reaccionamos a escribir en un input

buscador.addEventListener("input", () => {
  console.log("En el buscador esta escrito ", buscador.value);
});

//decidir segun lo escrito en el buscador

function filtrar() {
  const textoInput = buscador.value.toLowerCase();
  for (const libro of libros) {
    const titulo = libro.querySelector(".titulo").textContent.toLowerCase();

    //el título contiene lo q ha escrito el user??
    if (titulo.includes(textoInput)) {
      libro.classList.remove("oculto");
    } else {
      libro.classList.add("oculto");
    }
  }
}
buscador.addEventListener("input", filtrar);
