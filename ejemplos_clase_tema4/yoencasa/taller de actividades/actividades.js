const actividades = [
    {
        nombre: "Club de lectura",
        categoria: "Literatura",
        precio: 5,
        plazas: 12
    },
    {
        nombre: "Taller de fotografía",
        categoria: "Arte",
        precio: 15,
        plazas: 8
    },
    {
        nombre: "Introducción a Python",
        categoria: "Tecnología",
        precio: 20,
        plazas: 10
    },
    {
        nombre: "Escritura creativa",
        categoria: "Literatura",
        precio: 10,
        plazas: 6
    },
    {
        nombre: "Diseño digital",
        categoria: "Tecnología",
        precio: 18,
        plazas: 5
    },
    {
        nombre: "Pintura acrílica",
        categoria: "Arte",
        precio: 12,
        plazas: 9
    }
];

const catalogo = document.querySelector("#catalogo");
const info = document.querySelector("#info");
const buscador = document.querySelector("#buscador");
const filtroDesplegable = document.querySelector("#filtro");
const contenedorReservas = document.querySelector("#reservas");
const total = document.querySelector("#total");
const vaciar = document.querySelector("#vaciar");

//estos tres siguientes son para capturar todo lo del formulario
const formulario = document.querySelector("#formulario");
const campos = formulario.querySelectorAll("input, select");
const aviso = document.querySelector("#aviso");

// Vamos a cargar las plazas del localStorage
const guardado = localStorage.getItem("plazas");
//hacemos una copia de plazas para ir guardando las plazas actualizadas
let plazas = guardado === null
    ? actividades.map(actividad => actividad.plazas)
    : JSON.parse(guardado);

//cargamos las reservas desde el localstorage
const guardadoReservas = localStorage.getItem("reservas");

let reservas = guardadoReservas === null
    ? []
    : JSON.parse(guardadoReservas);

function guardarReservas() {
    localStorage.setItem("reservas", JSON.stringify(reservas));
}


//al guardar la reserva se actualizan las plazas
function guardar() {
    localStorage.setItem("plazas", JSON.stringify(plazas));
}
//calculamos el total de las reservas
function calcularTotal() {
    const suma = reservas.reduce((acumulador, reserva) => {
        return acumulador + reserva.precio;
    }, 0);

    return suma;
}


//pintar reservas en la derecha

function pintarReservas(){
    //primero borramos las reservas
    contenedorReservas.innerHTML="";
    for(const reserva of reservas){
        const li = document.createElement("li");

        li.textContent = `${reserva.nombre} - ${reserva.precio} €`;

        contenedorReservas.append(li);
    }
    //pintamos el total tambien 
      total.textContent = `${calcularTotal().toFixed(2)} €`;

}


//Definimos la función Comprobar cada campo del formulario
function comprobar(campo) {
    //closest() busca el elemento padre más cercano que coincida con el selector indicado.
    // cada campo está dentro de un <p>, así que buscamos ese párrafo.
    const parrafo = campo.closest("p");

//nos quedamos con error para mostrar los errores
    const error = parrafo.querySelector(".error");

    const valor = campo.value.trim();

    if (valor === "") {
        error.textContent = "Este campo es obligatorio";
        return false;
    }

    else if (campo.id === "nombre" && valor.length < 3) {
        error.textContent = "El nombre debe tener al menos 3 caracteres";
        return false;
    }

    else if (campo.id === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        error.textContent = "Introduce un correo electrónico válido";
        return false;
    }

    else if (campo.id === "telefono" && !/^[67]\d{8}$/.test(valor)) {
        error.textContent = "El teléfono debe tener 9 cifras y empezar por 6 o 7";
        return false;
    }

    else if (campo.id === "asistentes" && (Number(valor) < 1 || Number(valor) > 4 || !Number.isInteger(Number(valor)))) {
        error.textContent = "Los asistentes deben ser entre 1 y 4";
        return false;
    }

    else {
        error.textContent = "";
        return true;
    }
}


//pintamos

function pintar(){

      //Lo primero que hace el LIMPIAR  la lista de los <li>
  for(const actividad of catalogo.querySelectorAll("li")){
    actividad.remove();
  }
//creamos los li de actividades
for (let i = 0; i < actividades.length ; i++){
    const cadalideactividades = document.createElement("li");
    cadalideactividades.classList.add("actividad");
    cadalideactividades.textContent =`${actividades[i].nombre} - ${actividades[i].precio.toFixed(2)} € -  ${actividades[i].categoria} -  ${plazas[i]} plazas libres`;

//añadimos el boton a cada li con su evento
const boton = document.createElement("button");
    boton.classList.add("actividad-button");
    boton.textContent = "Reservar";
    boton.addEventListener("click", () =>{
        if(plazas[i] === 0){
            return;
        }else{
            plazas[i] --;
        }
        reservas.push(actividades[i]);
        guardarReservas();
        guardar();
        pintar();
        pintarReservas();
    });
    
    //evento mouse hover de la info de las actividades
    cadalideactividades.addEventListener("mouseenter", () =>{
        info.textContent = `${actividades[i].nombre} - precio: ${actividades[i].precio.toFixed(2)}  -  ${actividades[i].categoria} -  ${plazas[i]} plazas. `;
    })


    cadalideactividades.addEventListener("mouseleave",()=>{
        info.textContent = "";
    })

    //aqui filtrar dependiendo del input y del desplegable


    const texto = buscador.value.toLowerCase().trim();
    const textoDesplegable = filtroDesplegable.value;

    if (!actividades[i].nombre.toLowerCase().trim().includes(texto)) {
    cadalideactividades.classList.add("oculto");
    }
    else if(textoDesplegable !== "" && actividades[i].categoria !== textoDesplegable){
    cadalideactividades.classList.add("oculto");
    }

cadalideactividades.append(boton);
catalogo.append(cadalideactividades);
}


}

pintar();
pintarReservas();

//añado el eventlistener al buscador
buscador.addEventListener("input",()=>{
        pintar();
    })
//añado el evento al desplegable
filtroDesplegable.addEventListener("change", () => {
    pintar();
});


//Cancelar todas las reservas con el boton
vaciar.addEventListener("click", () => {
//recorremos el array de las reservas
reservas.forEach(reserva => {
    //buscamos el indice de la actividad
    const indice = actividades.findIndex(actividad =>
        actividad.nombre === reserva.nombre
    );
    //devolvemos las plazas
    plazas[indice]++;
});

    reservas = [];

    guardar();
    guardarReservas();

    pintar();
    pintarReservas();
});

//validar el formulario
//definimos el evento a cada campo cuando pierda el foco
for (const campo of campos) {

    campo.addEventListener("blur", () => {
        comprobar(campo);
    });

}

//validamos en el submit
formulario.addEventListener("submit", (event) => {
    
    event.preventDefault();
    aviso.textContent = ""; //borramos el aviso

    let valido = true;

    for (const campo of campos) {

        if (!comprobar(campo)) {
            valido = false;
        }
    }

    if (!valido) {
        aviso.textContent = "Revisa los errores del formulario";
        return;
    }

    const datos = new FormData(formulario);
    const inscripcion = Object.fromEntries(datos);

    console.log(inscripcion);

    aviso.textContent = "¡Inscripción realizada correctamente!";

    formulario.reset();
    for (const campo of campos) {
    campo.closest("p").querySelector(".error").textContent = "";
}

});



//convertir el objeto que nos devuelve inscripcion en un array

//const inscripcion = {
//     nombre: "Marta",
//     correo: "marta@gmail.com",
//     telefono: "612345678",
//     asistentes: "2",
//     categoria: "Literatura"
// };
// const arrayInscripcion = [...Object.values(inscripcion)];

//metemos todos los objetos de las inscripciones en un array

// let inscripciones = [];

// inscripciones = [...inscripciones, inscripcion];