// IES Gran Capitán · Reserva de puestos

// Aulas y sillas disponibles. Las sillas ocupadas no se pueden seleccionar.
const aulas = {
  "1º DAW": {
    sillas: ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"],
    ocupadas: ["A3", "B2"]
  },
  "2º DAW": {
    sillas: ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"],
    ocupadas: ["A2", "A5", "B4"]
  },
  "1º DAM": {
    sillas: ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"],
    ocupadas: ["A1", "B1"]
  }
};

// Capturamos los elementos del HTML.
const grupo = document.querySelector("#grupo");
const buscador = document.querySelector("#buscador");
const aula = document.querySelector("#aula");
const info = document.querySelector("#info");
const resumen = document.querySelector("#resumen");
const total = document.querySelector("#total");
const formulario = document.querySelector("#formulario");
const aviso = document.querySelector("#aviso");
const campos = formulario.querySelectorAll("input");

// Constantes de validación: las reglas salen del enunciado.
const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,50}$/;
const regexCorreo = /^[A-Za-z0-9._%+-]+@alu\.uco\.es$/;
const regexTelefono = /^[67]\d{8}$/;

// Precios de los materiales.
const preciosMaterial = {
  "Auriculares": 2,
  "Ratón": 3,
  "Adaptador USB": 4
};

// Guardamos los códigos de las sillas elegidas.
let sillasElegidas = [];

// FUNCIONES

// Calcula el precio de los materiales seleccionados.
function precioMateriales() {
  let suma = 0;
  const materiales = formulario.querySelectorAll('input[name="material"]:checked');

  for (const material of materiales) {
    suma = suma + preciosMaterial[material.value];
  }

  return suma;
}

// Calcula el precio de la reserva: 5 euros por silla más materiales.
function calcularTotal() {
  return sillasElegidas.length * 5 + precioMateriales();
}

// Comprueba un campo y muestra el mensaje en su span.error.
function comprobar(campo) {
  const parrafo = campo.closest("p");
  const error = parrafo.querySelector(".error");

  if (campo.validity.valueMissing) {
    error.textContent = "Este campo es obligatorio";
  } else if (campo.id === "nombre" && !regexNombre.test(campo.value.trim())) {
    error.textContent = "Introduce nombre y apellidos, solo letras y espacios (3-50 caracteres)";
  } else if (campo.id === "correo" && !regexCorreo.test(campo.value.trim())) {
    error.textContent = "Debe ser un correo terminado en @alu.uco.es";
  } else if (campo.id === "telefono" && !regexTelefono.test(campo.value.trim())) {
    error.textContent = "El teléfono debe tener 9 cifras y empezar por 6 o 7";
  } else {
    error.textContent = "";
  }
}

// Pinta las sillas del aula elegida.
function pintarAula() {
  // Limpiamos las sillas anteriores.
  for (const silla of aula.querySelectorAll("button")) {
    silla.remove();
  }

  // Si todavía no se ha elegido grupo, no pintamos sillas.
  if (grupo.value === "") {
    resumen.textContent = "Selecciona un grupo para ver sus sillas.";
    total.textContent = "";
    return;
  }

  // Obtenemos los datos del aula seleccionada.
  const datosAula = aulas[grupo.value];

  // Recorremos todas las sillas de ese aula.
  for (const codigo of datosAula.sillas) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("silla");
    boton.textContent = codigo;
    boton.dataset.codigo = codigo;

    // Marcamos como ocupadas las sillas que no se pueden elegir.
    if (datosAula.ocupadas.includes(codigo)) {
      boton.classList.add("ocupada");
      boton.disabled = true;
    }

    // Marcamos las sillas que ya ha elegido el usuario.
    if (sillasElegidas.includes(codigo)) {
      boton.classList.add("elegida");
    }

    // Aplicamos el filtro del buscador.
    if (!codigo.toLowerCase().includes(buscador.value.toLowerCase())) {
      boton.classList.add("oculto");
    }

    aula.append(boton);
  }

  pintarResumen();
}

// Pinta el resumen y el precio.
function pintarResumen() {
  if (sillasElegidas.length === 0) {
    resumen.textContent = "Todavía no has seleccionado ninguna silla.";
    total.textContent = "";
  } else {
    resumen.textContent =
      `Grupo: ${grupo.value}. Sillas: ${sillasElegidas.join(", ")}`;

    total.textContent = `Total: ${calcularTotal().toFixed(2)} €`;
  }
}

// EVENTOS

// Al cambiar el grupo, borramos la selección anterior y pintamos su aula.
grupo.addEventListener("change", () => {
  sillasElegidas = [];
  buscador.value = "";
  aviso.textContent = "";
  pintarAula();
});

// Buscador: oculta las sillas cuyo código no coincide.
buscador.addEventListener("input", () => {
  pintarAula();
});

// PROPAGACIÓN DE EVENTOS / DELEGACIÓN
// El evento se escucha en el contenedor #aula, no en cada botón.
// El clic de una silla sube desde el botón hasta el contenedor.
aula.addEventListener("click", (evento) => {
  // Comprobamos si el elemento pulsado (o uno de sus padres) es una silla.
  const silla = evento.target.closest(".silla");

  // Si se ha pulsado el fondo del aula, no hacemos nada.
  if (silla === null) {
    return;
  }

  // Recuperamos el código guardado en data-codigo.
  const codigo = silla.dataset.codigo;

  // Si ya estaba elegida, la quitamos de la selección.
  if (sillasElegidas.includes(codigo)) {
    sillasElegidas = sillasElegidas.filter((elemento) => elemento !== codigo);
  } else {
    // Permitimos un máximo de 2 sillas.
    if (sillasElegidas.length === 2) {
      aviso.textContent = "Solo puedes reservar un máximo de 2 sillas.";
      return;
    }

    sillasElegidas.push(codigo);
  }

  aviso.textContent = "";
  pintarAula();
});

// Validamos al salir del campo.
for (const campo of campos) {
  campo.addEventListener("blur", () => {
    if (campo.type !== "radio" && campo.type !== "checkbox") {
      comprobar(campo);
    }
  });
}

// Volvemos a comprobar cuando se modifica el contenido.
for (const campo of campos) {
  campo.addEventListener("input", () => {
    if (campo.type !== "radio" && campo.type !== "checkbox") {
      comprobar(campo);
    }
  });
}

// Validamos los radio buttons cuando cambia la selección.
const radios = formulario.querySelectorAll('input[name="turno"]');

for (const radio of radios) {
  radio.addEventListener("change", () => {
    const error = radio.closest("fieldset").querySelector(".error");
    error.textContent = "";
  });
}

// Al cambiar los materiales, actualizamos el total.
const materiales = formulario.querySelectorAll('input[name="material"]');

for (const material of materiales) {
  material.addEventListener("change", () => {
    pintarResumen();
  });
}

// Envío del formulario.
formulario.addEventListener("submit", (evento) => {
  // Evitamos que la página se recargue.
  evento.preventDefault();

  // Comprobamos que se haya elegido un grupo.
  if (grupo.value === "") {
    aviso.textContent = "Debes seleccionar un grupo.";
    return;
  }

  // Comprobamos que haya al menos una silla seleccionada.
  if (sillasElegidas.length === 0) {
    aviso.textContent = "Debes seleccionar al menos una silla.";
    return;
  }

  // Comprobamos que se haya elegido un turno.
  const turnoElegido = formulario.querySelector('input[name="turno"]:checked');
  const errorTurno = formulario.querySelector('input[name="turno"]').closest("fieldset").querySelector(".error");

  if (turnoElegido === null) {
    errorTurno.textContent = "Debes elegir un turno.";
    aviso.textContent = "Hay datos por corregir en el formulario.";
    return;
  }

  // Comprobamos los campos de texto.
  let formularioCorrecto = true;

  for (const campo of campos) {
    if (campo.type === "text") {
      comprobar(campo);

      if (!campo.validity.valid ||
          (campo.id === "nombre" && !regexNombre.test(campo.value.trim())) ||
          (campo.id === "correo" && !regexCorreo.test(campo.value.trim())) ||
          (campo.id === "telefono" && !regexTelefono.test(campo.value.trim()))) {
        formularioCorrecto = false;
      }
    }
  }

  // Comprobamos la aceptación de condiciones.
  const condiciones = document.querySelector("#condiciones");
  const errorCondiciones = condiciones.closest("p").querySelector(".error");

  if (!condiciones.checked) {
    errorCondiciones.textContent = "Debes confirmar que los datos son correctos.";
    formularioCorrecto = false;
  } else {
    errorCondiciones.textContent = "";
  }

  if (!formularioCorrecto) {
    aviso.textContent = "Hay datos por corregir en el formulario.";
    return;
  }

  // Recogemos los datos del formulario de una vez.
  const datos = new FormData(formulario);
  const reserva = Object.fromEntries(datos);

  // Los checkbox pueden tener varios valores con el mismo name.
  reserva.material = datos.getAll("material");

  const precioFinal = calcularTotal().toFixed(2);

  aviso.textContent =
    `Reserva confirmada para ${reserva.nombre}. ` +
    `Grupo: ${grupo.value}. ` +
    `Turno: ${reserva.turno}. ` +
    `Sillas: ${sillasElegidas.join(", ")}. ` +
    `Total: ${precioFinal} €.`;

  // Limpiamos el formulario y la selección.
  formulario.reset();
  grupo.value = "";
  buscador.value = "";
  sillasElegidas = [];

  // Borramos los mensajes de error.
  for (const error of formulario.querySelectorAll(".error")) {
    error.textContent = "";
  }

  pintarAula();
});

// Pintado inicial.
pintarAula();
