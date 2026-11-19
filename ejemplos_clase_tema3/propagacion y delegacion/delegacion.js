const pista = document.querySelector("#pista");
const info = document.querySelector("#info");
const aviso = document.querySelector("#aviso");

const zonas = ["A", "B", "C"];
const vendidas = ["A2", "A3","B5","B6","B7"];


for (const letra of zonas) {
  const zona = document.createElement("div");
  zona.classList.add("zona");
  //vamos a crear las entradas dentro de cada zona
  for (let numero = 1; numero <= 10; numero++) {
    const entrada = document.createElement("button");
    entrada.classList.add("entrada");
    const spanLetra = document.createElement("span");
    spanLetra.classList.add("letra");
    spanLetra.textContent = letra;

    const spanNumero = document.createElement("span");
    spanNumero.textContent = numero;

    entrada.append(spanLetra, spanNumero); //añadimos a cada butaca
    if (vendidas.includes(`${letra}${numero}`)) {
      entrada.classList.add("vendida");
    }
    zona.append(entrada);
  }
  pista.append(zona);
}

//delegación con closest

pista.addEventListener("click", (evento) => {
    const entradaSeleccionada = evento.target.closest(".entrada");

    if (!entradaSeleccionada) {
        return;
    }

    if (entradaSeleccionada.classList.contains("vendida")) {
        aviso.textContent = `La entrada ${entradaSeleccionada.textContent} está vendida`;
        return;
    }

    const seleccionada = entradaSeleccionada.classList.toggle("seleccionada");

    if (seleccionada) {
        aviso.textContent = `Has seleccionado la entrada ${entradaSeleccionada.textContent}`;
    } else {
        aviso.textContent = `Has deseleccionado la entrada ${entradaSeleccionada.textContent}`;
    }

    const seleccionadas = pista.querySelectorAll(".seleccionada");
    info.textContent = `Entradas seleccionadas: ${seleccionadas.length}`;
    //mostramos las entradas seleccionadas
    aviso.textContent = `Tus entradas: ${Array.from(seleccionadas)
    .map(entrada => entrada.textContent)
    .join(", ")}`;
});