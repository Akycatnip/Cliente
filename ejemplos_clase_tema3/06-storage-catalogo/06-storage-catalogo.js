const tema = document.querySelector("#tema");
const libros = [...document.querySelectorAll(".libro")];
const visitas = document.querySelector("#visitas");

//vamos a almacenar en localstorage el contador visitas

let guardado = localStorage.getItem("visitas"); //dame lo q hay
console.log("Lo que ya está guardado es: ", guardado);

if (guardado === null) {
  guardado = 1;
} else {
  guardado = Number(guardado) + 1;
}

localStorage.setItem("visitas", guardado);

//mostrar en la página el número de visitas
visitas.textContent = `Número de visitas: ${guardado}`;

//guardar mis favoritos en una lista :JSON

const textoFavoritos = localStorage.getItem("favoritos"); //dame lo q haya
//vamos primero a almacenar y luego recuperamos
const favoritos = textoFavoritos === null ? [] : JSON.parse(textoFavoritos); //si hay algo lo parseo sino creo un array vacío

for (const libro of libros) {
  const titulo = libro.querySelector(".titulo").textContent;
  if (favoritos.includes(titulo)) {
    libro.classList.add("destacado");
  }
}

//Almacenamos en localStorage los favoritos

//recorremos favoritos
for (const libro of libros) {
  libro.querySelector("button").addEventListener("click", () => {
    libro.classList.toggle("destacado");
    //filtramos los q tienen la clase destacados y de esos cn el map me quedo solo con el título
    const marcados = libros
      .filter((l) => l.classList.contains("destacado"))
      .map((l) => l.querySelector(".titulo").textContent);

    localStorage.setItem("favoritos", JSON.stringify(marcados)); //lo convierto para que lo entienda localstorage
  });
}

//vamos a cambiar y recordad el tema del usuario
const botonTema = document.querySelector("#tema");

//primero vemos si hay algo guardado en el tema en localstorage
if (localStorage.getItem("oscuro") === "true") {
  document.body.classList.add("oscuro");
}

//vamos a alternar oscuro y claro
botonTema.addEventListener("click", () => {
  const estoyOscuro = document.body.classList.toggle("oscuro"); //toggle devuelve true si la clase se queda puesta
  localStorage.setItem("oscuro", estoyOscuro); //guarda true o false, peeeeero localstorage guarda str asi q sería "true"/"false"
});
