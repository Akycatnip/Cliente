//vamos a trabajar con formularios
const formulario = document.querySelector("#compra");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); //me cargo lo q hace submit

  const nombre = document.querySelector("#nombre").value;
  const correo = document.querySelector("#correo").value;
  const entradas = document.querySelector("#entradas").value;
  const sesion = document.querySelector("#sesion").value;
  const acepta = document.querySelector("#condiciones").checked;

  //esto ultimo hace q de los radiobuton solo nos quedemos con el q esta checked

  const version = document.querySelector('input[name="version"]:checked').value;
  const resumen = document.querySelector("#resumen");

  if (!acepta) {
    resumen.textContent = "Falta aceptar las condiciones";
    return;
  }
  //el precio dependerá de la sesión
  const precio = sesion == "18:00" ? 5 : 7;
  const total = entradas * precio;

  resumen.textContent =
    `Compra a nombre de: ${nombre}\n` +
    `Entradas${entradas} - sesión de las ${sesion} - version ${version}\n` +
    `Total ${total} €\n` +
    `Confirmación a ${correo}`;
});
