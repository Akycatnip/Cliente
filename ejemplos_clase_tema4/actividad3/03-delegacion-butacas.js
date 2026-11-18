//propagación delegación y closest
const sala = document.querySelector("#sala");

const filas = ["A", "B", "C", "D", "E", "F"];
const ocupadas = ["C4", "C5", "F1"];

for (const letra of filas) {
  const fila = document.createElement("div");
  fila.classList.add("fila");
  //vamos a crear las butacas dentro de cada fila
  for (let numero = 1; numero <= 10; numero++) {
    const butaca = document.createElement("button");
    butaca.classList.add("butaca");
    const spanLetra = document.createElement("span");
    spanLetra.classList.add("letra");
    spanLetra.textContent = letra;

    const spanNumero = document.createElement("span");
    spanNumero.textContent = numero;

    butaca.append(spanLetra, spanNumero); //añadimos a cada butaca
    if (ocupadas.includes(`${letra}${numero}`)) {
      butaca.classList.add("ocupada");
    }
    fila.append(butaca);
  }
  sala.append(fila);
}

//propagación

// sala.addEventListener("click", (evento) => {
//   //añadimos un escuchador a toda la sala
//   console.log("Click dentro de sala, sobre; ", evento.target);
//   //evento.target.classList.toggle("elegida");
// });
// document.addEventListener("click", () => {
//   //añadimos un escuchador a todo el document
//   console.log("También llega hasta document");
// });

//delegación

const aviso = document.querySelector("#aviso");

// sala.addEventListener("click", (evento) => {
//   if (!evento.target.classList.contains("butaca")) {
//     return;
//   }
//   if (evento.target.classList.contains("ocupada")) {
//     aviso.textContent = `La butaca ${evento.target.textContent} está ocupada`;
//     return;
//   }
//   evento.target.classList.toggle("elegida");
// });

//delegación con closest

sala.addEventListener("click", (evento) => {
  const butacaSelect = evento.target.closest(".butaca"); //quedate con el elemento más cercano que contenga la clase butaca
  if (!butacaSelect) {
    return;
  }
  if (butacaSelect.classList.contains("ocupada")) {
    aviso.textContent = `La butaca ${evento.target.textContent} está ocupada`;
    return;
  }
  butacaSelect.classList.toggle("elegida");
});
