const comprar = document.querySelector("#comprar");
const butacas = [...document.querySelectorAll(".butaca")];
const aviso = document.querySelector("#aviso");
const salir = document.querySelector("#salir");

//vemos propiedades de un evento

comprar.addEventListener("click", (evento) => {
  console.log(evento);
  console.log("tipo:", evento.type);
  console.log("elemento", evento.target);
});

//asociamos la funcion a todas las butacas

function elegir(evento) {
  //puede recoger el evento aunque en la llamada esta cmo argumento
  // console.log("butaca seleccionada", evento.target);

  //primero compruebo si está ocupada
  if (evento.target.classList.contains("ocupada")) {
    aviso.textContent = `La butaca ${evento.target.textContent} está ocupada`;
    return; //acaba la funcion
  }

  evento.target.classList.toggle("elegida");

  //añadimos a la lista la nueva butaca clickada o la quitamos
  const elegidas = [...document.querySelectorAll(".elegida")].map(
    (butaca) => butaca.textContent,
  ); //solo me quedo con el nombre
  if (elegidas.length === 0) {
    aviso.textContent = "Elige una butaca";
  } else {
    //ya las tengo así q las voy a escribir

    aviso.textContent = elegidas.join(", ");
  }
}

for (const butaca of butacas) {
  butaca.addEventListener("click", elegir);
}

//preguntamos si estamos seguros de q queremos salir de la pagina
salir.addEventListener("click", (evento) => {
  if (!confirm("Salir de la página sin terminar de comprar?")) {
    evento.preventDefault(); //lo q tenga definido por defecto lo quitas
  }
});
