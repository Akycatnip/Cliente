// Talleres disponibles. Cada taller tiene nombre, precio y descripción.
const talleres = [
  { nombre: "Iniciación a JavaScript", precio: 25, descripcion: "Aprende las bases de JavaScript." },
  { nombre: "Diseño web con CSS", precio: 20, descripcion: "Crea páginas web con estilo." },
  { nombre: "Introducción a PHP", precio: 30, descripcion: "Primeros pasos en programación del servidor." },
  { nombre: "Bases de datos", precio: 28, descripcion: "Aprende a organizar y consultar datos." }
];

// Capturamos los elementos del HTML.
const listaTalleres = document.querySelector("#talleres");
const info = document.querySelector("#info");
const resumen = document.querySelector("#resumen");
const total = document.querySelector("#total");
const formulario = document.querySelector("#formulario");
const aviso = document.querySelector("#aviso");
const campos = formulario.querySelectorAll("input");

// Reglas del ejercicio.
const preciosMaterial = {
  "Cuaderno": 3,
  "Kit de herramientas": 8,
  "Dossier impreso": 2
};

let tallerElegido = -1;

// FUNCIONES

// Devuelve el precio de los materiales seleccionados.
function precioMateriales() {
  let suma = 0;
  const materiales = formulario.querySelectorAll('input[name="material"]:checked');

  for (const material of materiales) {
    suma = suma + preciosMaterial[material.value];
  }

  return suma;
}

// Devuelve el precio total de la inscripción.
function calcularTotal() {
  if (tallerElegido === -1) {
    return 0;
  }

  return talleres[tallerElegido].precio + precioMateriales();
}

// Comprueba un campo y escribe el error en su span.
function comprobar(campo) {
  const contenedor = campo.closest("p, fieldset");
  const error = contenedor.querySelector(".error");

  if (campo.validity.valueMissing) {
    if (campo.name === "turno") {
      error.textContent = "Debes elegir un turno";
    } else if (campo.name === "condiciones") {
      error.textContent = "Debes aceptar las condiciones";
    } else {
      error.textContent = "Este campo es obligatorio";
    }
  } else if (campo.validity.typeMismatch && campo.type === "email") {
    error.textContent = "Escribe un correo electrónico válido";
  } else {
    error.textContent = "";
  }
}

// Pinta de nuevo la lista de talleres y el resumen.
function pintar() {
  // Limpiamos los talleres que hubiera antes.
  for (const item of listaTalleres.querySelectorAll("li")) {
    item.remove();
  }

  // Recorremos el array y creamos un li por cada taller.
  for (let i = 0; i < talleres.length; i++) {
    const item = document.createElement("li");
    item.classList.add("taller");
    item.textContent = `${talleres[i].nombre} · ${talleres[i].precio.toFixed(2)} €`;

    // Creamos el botón para elegir el taller.
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Elegir";

    boton.addEventListener("click", () => {
      tallerElegido = i;
      aviso.textContent = "";
      pintar();
    });

    item.append(boton);

    // Al pasar el ratón mostramos la descripción.
    item.addEventListener("mouseenter", () => {
      info.textContent = talleres[i].descripcion;
    });

    item.addEventListener("mouseleave", () => {
      info.textContent = "";
    });

    listaTalleres.append(item);
  }

  // Pintamos el resumen de la inscripción.
  if (tallerElegido === -1) {
    resumen.textContent = "Todavía no has elegido ningún taller.";
    total.textContent = "";
  } else {
    const materiales = formulario.querySelectorAll('input[name="material"]:checked');
    let textoMateriales = "";

    for (const material of materiales) {
      textoMateriales = textoMateriales + material.value + ", ";
    }

    if (textoMateriales === "") {
      textoMateriales = "Ninguno";
    } else {
      textoMateriales = textoMateriales.slice(0, -2);
    }

    resumen.textContent =
      `Taller: ${talleres[tallerElegido].nombre}. Material: ${textoMateriales}.`;

    total.textContent = `Total: ${calcularTotal().toFixed(2)} €`;
  }
}

// Primera llamada para mostrar la página.
pintar();

// Cuando cambian los materiales, actualizamos el resumen y el precio.
const materiales = formulario.querySelectorAll('input[name="material"]');

for (const material of materiales) {
  material.addEventListener("change", () => {
    pintar();
  });
}

// Validamos cada campo cuando pierde el foco.
for (const campo of campos) {
  campo.addEventListener("blur", () => {
    comprobar(campo);
  });
}

// También comprobamos cuando el usuario modifica un campo.
for (const campo of campos) {
  campo.addEventListener("change", () => {
    comprobar(campo);
  });
}

// Enviamos la inscripción.
formulario.addEventListener("submit", (evento) => {
  // Evitamos que la página se recargue.
  evento.preventDefault();

  // Comprobamos primero que haya elegido un taller.
  if (tallerElegido === -1) {
    aviso.textContent = "Debes elegir un taller antes de enviar la inscripción.";
    return;
  }

  // Comprobamos la validez de los campos.
  if (!formulario.checkValidity()) {
    for (const campo of campos) {
      comprobar(campo);
    }

    aviso.textContent = "Hay datos por corregir en el formulario.";
    return;
  }

  // Recogemos los datos del formulario.
  const datos = new FormData(formulario);
  const inscripcion = Object.fromEntries(datos);

  // Los checkbox con el mismo name pueden ser varios.
  inscripcion.material = datos.getAll("material");

  aviso.textContent =
    `Inscripción enviada a nombre de ${inscripcion.nombre}. ` +
    `Turno: ${inscripcion.turno}. ` +
    `Total: ${calcularTotal().toFixed(2)} €.`;

  // Dejamos el formulario preparado para otra inscripción.
  formulario.reset();
  tallerElegido = -1;
  pintar();

  // Limpiamos los mensajes de error después de resetear el formulario.
  for (const error of formulario.querySelectorAll(".error")) {
    error.textContent = "";
  }
});
