// Series por ver

// Las series que muestra la página la primera vez que se abre.
const seriesDePartida = [
  { titulo: "Ataque a los titanes", vista: true },
  { titulo: "Frieren", vista: false },
  { titulo: "Guardianes de la noche", vista: false },
  { titulo: "Spy x Family", vista: false },
  { titulo: "Haikyuu!!", vista: false },
];

const botonTema = document.querySelector("#tema");
const lista = document.querySelector("#series");
const botonAnadir = document.querySelector("#anadir");
const inputTitulo = document.querySelector("#titulo");
const contador = document.querySelector("#contador");
const buscador = document.querySelector("#buscador");
//Vamos a cambiar el tema

// primero ver si hay tema guardado
if (localStorage.getItem("tema") === "oscuro") {
  document.body.classList.add("oscuro");
}

//despues lo cambiamos con el botón

botonTema.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  if (document.body.classList.contains("oscuro")) {
    localStorage.setItem("tema", "oscuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
});

//vamos a cargar las series del userData
//primero miramos si hay series en localstorage, si no hay cargo las de partida

const seriesGuardadas = localStorage.getItem("series");
let series =
  seriesGuardadas === null ? seriesDePartida : JSON.parse(seriesGuardadas);

//2º guardamos por si las q se han cargado son las de partida
function guardar() {
  localStorage.setItem("series", JSON.stringify(series));
}

//definir el PINTAR las series en mi pagina

function pintar() {
  //lo primero borramos las series q esten pintadas
  for (const item of lista.querySelectorAll("li")) {
    item.remove();
  }
  //crear los <li> q necesitamos

  for (const serie of series) {
    const item = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.classList.add("titulo");
    nombre.textContent = serie.titulo;
    if (serie.vista) {
      item.classList.add("vista");
    }
    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";
    //el evento del botón QUITAR
    botonQuitar.addEventListener("click", () => {
      if (confirm(`¿Quitar ${serie.titulo} de la lista?`)) {
        series = series.filter((s) => s !== serie);
        guardar();
        pintar();
      }
    });
    //Evento de pulsar sobre una seria y ponerla vista o no vista
    nombre.addEventListener("click", () => {
      serie.vista = !serie.vista;
      guardar();
      pintar();
    });

    //aqui filtar dependiendo del input

    const texto = buscador.value.toLowerCase().trim();
    //oculta si no tiene lo escrito

    if (!serie.titulo.toLowerCase().trim().includes(texto)) {
      item.classList.add("oculto");
    }

    item.append(nombre, botonQuitar);
    lista.append(item);
  }
  //actualizar el contador de series por ver en la página y en el título

  const pendientes = series.filter((s) => !s.vista).length;

  if (series.length === 0) {
    contador.textContent = "No hay series";
  } else {
    contador.textContent = `Quedan ${pendientes} por ver de ${series.length}`;
  }

  document.title = `(${pendientes}) series por ver.`;
}
pintar();

//añadir series nuevas

botonAnadir.addEventListener("click", () => {
  const titulo = inputTitulo.value;
  const repetida = series.some(
    (s) => s.titulo.toLowerCase().trim() === titulo.toLowerCase().trim(),
  );
  if (titulo === "") {
    alert("Escribe el título de la serie");
  } else if (repetida) {
    alert("Este título ya está en la lista");
  } else {
    series.push({ titulo: titulo, vista: false });
    guardar();
    pintar();
    inputTitulo.value = "";
  }
});
buscador.addEventListener("input", pintar);
// //Decidir según lo escrito en buscador
// function filtrar() {
//   const escritoEnBuscador = buscador.value.toLowerCase().trim();

//   for (const item of lista.querySelectorAll("li")) {
//     const titulo = item.querySelector(".titulo").textContent.toLowerCase();

//     const coincide = titulo.includes(escritoEnBuscador);

//     item.classList.toggle("oculto", !coincide);
//   }
// }
// buscador.addEventListener("input", filtrar);
