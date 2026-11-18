const pedir = document.querySelector("#pedir");
const reiniciar = document.querySelector("#reiniciar");
const prestamos = document.querySelector("#prestamos");
const libros = [...document.querySelectorAll(".libro")];
const buscador = document.querySelector("#buscador");
const resultados = document.querySelector("#resultados");
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
  //contador de coincidencias
  let coinciden = 0;
  for (const libro of libros) {
    const titulo = libro.querySelector(".titulo").textContent.toLowerCase();

    //el título contiene lo q ha escrito el user??
    if (titulo.includes(textoInput)) {
      libro.classList.remove("oculto");
      coinciden++;
    } else {
      libro.classList.add("oculto");
    }
  }
  resultados.textContent = `${coinciden} resultados coinciden.`;
}
buscador.addEventListener("input", filtrar);

//vamos a añadirle un evento al botón reiniciar
reiniciar.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres poner a 0 los préstamos?")) {
    prestamos.textContent = "Préstamos :0";
    cont_prestamos = 0;
    alert("Préstamos a cero");
  }
});
