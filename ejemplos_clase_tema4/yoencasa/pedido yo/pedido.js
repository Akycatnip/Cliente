// Taberna GCapitán · Pedidos a domicilio

// La carta. Cada plato tiene su nombre, su precio en euros y la lista de sus
// alérgenos, que puede estar vacía.
const carta = [
  { nombre: "Salmorejo", precio: 6.5, alergenos: ["gluten", "huevo"] },
  { nombre: "Flamenquín", precio: 9, alergenos: ["gluten", "huevo", "leche"] },
  { nombre: "Croquetas de jamón", precio: 7, alergenos: ["gluten", "leche"] },
  { nombre: "Berenjenas con miel", precio: 7.5, alergenos: ["gluten"] },
  { nombre: "Rabo de toro", precio: 12.5, alergenos: ["sulfitos"] },
  {
    nombre: "Ensalada de naranja y bacalao",
    precio: 8,
    alergenos: ["pescado"],
  },
  { nombre: "Patatas fritas", precio: 4, alergenos: [] },
  { nombre: "Pastel cordobés", precio: 4.5, alergenos: ["gluten", "huevo"] },
];

const listaCarta = document.querySelector("#listaCarta");
const info = document.querySelector("#info");
const buscador = document.querySelector("#buscador");
const lineas = document.querySelector("#lineas");
const totales = document.querySelector("#totales");
const vaciar = document.querySelector("#vaciar");
const formulario = document.querySelector("#entrega");
const campos = formulario.querySelectorAll("input, select");
const aviso = document.querySelector("#aviso");

//Definimos las reglas del negocio
const pedidoMinimo = 10;
const envioGratis = 20;
const gastosEnvio = 2.5;

//FUNCIONES
//Función subtotal
function subtotal() {
  let suma = 0;
  for (let i = 0; i < carta.length; i++) {
    suma = suma + carta[i].precio * cantidades[i];
  }
  return suma;
}
//Función de calcular el gasto de envío
function envio() {
  if (subtotal() >= envioGratis) {
    return 0;
  }
  return gastosEnvio;
}

//Definimos la función Comprobar cada campo del formulario segun los pattern del html
function comprobar(campo) {
  //El mensaje se escribe en el <span class=error....> de cada <p>
  const parrafo = campo.closest("p"); //Quien es el padre del input o select que recibe, que será un <p>
  const error = parrafo.querySelector(".error"); //Dentro de ESE párrafo, me da su span de error
  if (campo.validity.valueMissing) {
    //en su span ponga "Este campo es obligatorio"
    error.textContent = "Este campo es obligatorio";
  } else if (campo.validity.patternMismatch && campo.id === "telefono") {
    error.textContent = "El teléfono tiene 9 cifras y empieza por 6 o 7";
  } else if (campo.validity.patternMismatch && campo.id === "cp") {
    error.textContent = "Solo repartimos en Córdoba capital (140xx)";
  } else {
    error.textContent = "";
  }
}

//FUNCION COMPROBAR CON REGEX
// const movil = /[67]\d{8}/;
// const names = /\w/;
// const cp = /140\d{2}/;

// function comprobar(campo){
//     const parrafo = campo.closest("p");
//     const error = parrafo.querySelector(".error");

//     if(campo.value == ""){
//         error.textContent = "Este campo es obligatorio";
//     } else if (campo.id === "telefono" && !movil.test(telefono.value)){
//         error.textContent = "Número de teléfono incorrecto";
//     } else if (campo.id === "nombre" && !names.test(campo.value)){
//         error.textContent = "Solo se admiten letras, números y guiones bajos";
//     } else if (campo.id === "cp" && !cp.test(campo.value)){
//         error.textContent = "Código postal incorrecto";
//     } else {
//         error.textContent = "";
//     }
// }

//Vamos a cargar el pedido
const guardado = localStorage.getItem("cantidades");
let cantidades = guardado === null ? carta.map(() => 0) : JSON.parse(guardado);

//Vamos a definir una función de guardar en LocalStorage
function guardar() {
  localStorage.setItem("cantidades", JSON.stringify(cantidades));
}

function pintar() {
  //Lo primero que hace el LIMPIAR el la lista de platos de la carta <li>
  for (const item of listaCarta.querySelectorAll("li")) {
    item.remove();
  }
  //creamos todos los platos
  for (let i = 0; i < carta.length; i++) {
    const item = document.createElement("li");
    item.classList.add("plato");
    item.textContent = `${carta[i].nombre} - ${carta[i].precio.toFixed(2)} € - Pedidos: ${cantidades[i]}`;
    //Si este plato cumple con el filtro de "buscar un plato"
    if (!carta[i].nombre.toLowerCase().includes(buscador.value.toLowerCase())) {
      item.classList.add("oculto");
    }
    //creamos botones con sus eventos y los pintamos
    const menos = document.createElement("button");
    menos.classList.add("menos");
    menos.textContent = "-";
    menos.addEventListener("click", () => {
      if (cantidades[i] === 0) {
        return;
      }
      cantidades[i]--;
      guardar();
      pintar();
    });
    const mas = document.createElement("button");
    mas.classList.add("mas");
    mas.textContent = "+";
    mas.addEventListener("click", () => {
      cantidades[i]++;
      guardar();
      pintar();
    });
    //Vamos a añadir el evento de los alérgenos
    item.addEventListener("mouseenter", () => {
      const listaAlergenos = carta[i].alergenos.join(", "); //Convertimos el array en un string separado por cadenas
      if (listaAlergenos == "") {
        info.textContent = "";
      } else {
        info.textContent = `${carta[i].nombre} - alérgenos: ${listaAlergenos}`;
      }
    });
    item.addEventListener("mouseleave", () => {
      info.textContent = "";
    });
    //Añadir los dos botones a este ítem
    item.append(menos, mas);
    //Añado todo el ítem <li> a la lista <ul>
    listaCarta.append(item);
  }
  //Pintar la parte derecha del acumulativo del pedido
  //primero limpiamos las lineas anteriores
  for (const j of lineas.querySelectorAll("li")) {
    j.remove();
  } //recorremos la carta
  for (let i = 0; i < carta.length; i++) {
    //si la cantidad es >0, es decir, si hemos pedido alguna unidad
    if (cantidades[i] > 0) {
      const importe = carta[i].precio * cantidades[i];
      const linea = document.createElement("li");
      linea.textContent = `${cantidades[i]} X ${carta[i].nombre} - ${importe.toFixed(2)} €`;
      lineas.append(linea);
    }
  }
  //Pintamos los subtotales. y totales
  if (subtotal() === 0) {
    totales.textContent = "Todavía no has pedido nada";
  } else {
    totales.textContent =
      `Subtotal: ${subtotal().toFixed(2)} €\n` +
      `Envío: ${envio().toFixed(2)} €\n` +
      `Total: ${(subtotal() + envio()).toFixed(2)} €`;
  }
}

pintar();

//Definimos el evento del Input de buscar
buscador.addEventListener("input", () => {
  pintar();
});

//Vaciar pedido con el botón
vaciar.addEventListener("click", () => {
  if (subtotal() === 0) {
    return;
  }
  if (!confirm("Vaciar el pedido?")) {
    return;
  }
  cantidades = carta.map(() => 0);
  guardar();
  pintar();
});

//Validar el formulario
//Definimos enevtos a cada campo cuando pierda el foco que compruebe
for (const campo of campos) {
  campo.addEventListener("blur", () => {
    comprobar(campo);
  });
}

for (const campo of campos) {
  campo.addEventListener("input", () => {
    comprobar(campo);
  });
}

//vamos a enviar el pedido
formulario.addEventListener("submit", (evento) => {
  //que la pagina no recargue
  evento.preventDefault();

  //las reglas que tiene q  cumplir el pedido que no estan en los campos del formulario
  if (subtotal() === 0) {
    aviso.textContent = "El pedido está vacío";
    return;
  }
  if (subtotal() < pedidoMinimo) {
    aviso.textContent = `El pedido mínimo es de ${pedidoMinimo} € `;
    return;
  }
  //comprobar los campos del formulario
  if (!formulario.checkValidity()) {
    aviso.textContent = "Hay datos de entrega por corregir";
    return;
  }

  //DATOS DEL FORMULARIO DE UNA VEZ
  //Vamos a coger todos los datos del formulario de una vez
  const datos = Object.fromEntries(new FormData(formulario)); //me los da en un json
  const total = (subtotal() + envio()).toFixed(2);
  aviso.textContent =
    `Pedido enviado a nombre de ${datos.nombre}` +
    `Llegará a la ${datos.hora}` +
    ` a ${datos.direccion}` +
    `Total: ${total}`;

  //una vez que hemos enviado de forma correcta vaciamos
  cantidades = carta.map(() => 0);
  guardar();
  pintar();
  formulario.reset();
});
