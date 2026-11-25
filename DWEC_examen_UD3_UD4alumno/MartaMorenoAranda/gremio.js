// Misiones del tablón del gremio.
// Cada misión tiene un título, la plata que paga y una descripción.
const misiones = [
  { titulo: "Recoger hierbas en el bosque de Fittoa", plata: 2, descripcion: "La curandera de la aldea necesita hierbas medicinales." },
  { titulo: "Escoltar un carro hasta Roa", plata: 4, descripcion: "Un mercader teme a los bandidos del camino." },
  { titulo: "Buscar piedras mágicas en la cueva", plata: 5, descripcion: "Las piedras brillan en la oscuridad. Llevar antorcha." },
  { titulo: "Cazar lobos de los colmillos", plata: 7, descripcion: "Una manada ataca el ganado de las aldeas." },
  { titulo: "Acompañar a una niña noble a Roa", plata: 12, descripcion: "Se busca escolta con paciencia. Mucha paciencia." },
  { titulo: "Abatir un dragón rojo", plata: 45, descripcion: "Solo para aventureros de mucha experiencia." },
];


const botonTema = document.querySelector("#tema");
const formulario = document.querySelector("#registro");
const campos = formulario.querySelectorAll("input", "select");
const error = document.querySelector("#error");
const tablon = document.querySelector("#tablon");
const misionesWeb = document.querySelector("#misiones");
const completadas = document.querySelector("#completadas");
const pergamino = document.querySelector("#pergamino");
const retirarse = document.querySelector("#retirarse");


//Vamos a cambiar el tema

//vemos si hay algo guardado el local storage
if (localStorage.getItem("tema") === "oscuro") {
  document.body.classList.add("oscuro");
}

//lo cambiamos con el boton
botonTema.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  if (document.body.classList.contains("oscuro")) {
    localStorage.setItem("tema", "oscuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
});



//Definimos la función Comprobar cada campo del formulario segun los pattern del html

const pueblo = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,19}$/;


function comprobar(campo) {
  //El mensaje se escribe en el <span class=error....> de cada <p>
  const parrafo = campo.closest("p"); //Quien es el padre del input o select que recibe, que será un <p>
  const error = parrafo.querySelector(".error"); //Dentro de ESE párrafo, me da su span de error
  if (campo.validity.valueMissing || campo.value === "") {
    //en su span ponga "Este campo es obligatorio"
    error.textContent = "Este campo es obligatorio";
  } else if (campo.id === "pueblo" && !pueblo.test(campo.value)) {
    error.textContent = "El pueblo está mal escrito";
  } else if (campo.id === "raza" && raza.value == "") {
    error.textContent = "La raza no es correcta";
  } else {
    error.textContent = "";
  }

}

//Validar el fomulario
//Definimos eventos a cada campo cuando pierda el foco que compruebe
for (const campo of campos) {
  campo.addEventListener("blur", () => {
    comprobar(campo);
  });
}
//también un escuchador al input
for (const campo of campos) {
  campo.addEventListener("input", () => {
    comprobar(campo);
  });
}

//enviar el formulario

formulario.addEventListener("submit", (evento) => {
  //que la pagina no recargue
  evento.preventDefault();

  tablon.classList.remove("oculto");
  registro.classList.add("oculto");

});

//guardamos el aventurero

//Función para guardar el aventurero en localStorage
function guardar() {

  localStorage.setItem("aventurero", JSON.stringify(campos));
}





//pintamos las misiones
function pintar() {

  //limpiamos primero las misiones
  for (const item of misionesWeb.querySelectorAll("li")) {
    item.remove();
  }

  //recorremos las misiones

  for (let i = 0; i < misiones.length; i++) {
    const mision = document.createElement("li");
    mision.textContent = `${misiones[i].titulo} - ${misiones[i].plata}`;
    //creo el boton completar

    const botonCompleta = document.createElement("button");
    botonCompleta.textContent = "Completada";
    botonCompleta.addEventListener("click", () => {
      botonCompleta.classList.add("oculto");
      pintar();
    });
    //añadimos los botones a las misiones
    mision.append(botonCompleta);
    misionesWeb.append(mision);

    //Vamos a añadir el evento del hover al pergaminos
    mision.addEventListener("mouseenter", () => {

      pergamino.textContent = `${misiones[i].descripcion}`;
    });
    mision.addEventListener("mouseleave", () => {
      info.textContent = "";
    });

  }

}
//misiones completadas


pintar();

//boton retirarse
retirarse.addEventListener("click", () => {

  if (!confirm("¿Estás seguro de que quieres retirarte?")) {
    return;
  }
  else {
    tablon.classList.add("oculto");
    registro.classList.remove("oculto");

  }
});