const butacas = [...document.querySelectorAll(".butaca")];
const aviso = document.querySelector("#aviso");
const info = document.querySelector("#info");
const pantalla = document.querySelector("#pantalla");
const codigo = document.querySelector("#codigo");
//filtramos las elegidas
function pintarAviso() {
  const elegidas = [...document.querySelectorAll(".elegida")].map(
    (butaca) => butaca.textContent,
  );
  const lista = elegidas.join(", ");

  if (elegidas.length === 0) {
    aviso.textContent = "Elige una butaca";
  } else {
    aviso.textContent = `Elegidas: ${lista}`;
  }
}

function marcar(butaca) {
  if (butaca.classList.contains("ocupada")) {
    aviso.textContent = `La butaca ${butaca.textContent} está ocupada`;
    return;
  }
  butaca.classList.toggle("elegida");
  pintarAviso();
}

for (const butaca of butacas) {
  butaca.addEventListener("click", (evento) => {
    marcar(evento.target);
  });

  //vamos a controlar el hover

  for (const butaca of butacas) {
    butaca.addEventListener("mouseenter", (evento) => {
      const nombre = evento.target.textContent;
      if (evento.target.classList.contains("ocupada")) {
        info.textContent = `Butaca ${nombre} - ocupada`;

        return;
      } else if (evento.target.classList.contains("elegida")) {
        info.textContent = `Butaca ${nombre} - elegida`;
      } else {
        info.textContent = `Butaca ${nombre} - libre`;
      }
    });
    butaca.addEventListener("mouseleave", () => {
      info.textContent = "";
    });
  }

  //evento dblclick

  pantalla.addEventListener("dblclick", () => {
    if (pantalla.textContent === "PANTALLA") {
      pantalla.textContent = "LA ULTIMA SESION";
    } else {
      pantalla.textContent = "PANTALLA";
    }
  });

  //eventos del teclado keydown
  function desmarcarTodas() {
    for (const butaca of butacas) {
      butaca.classList.remove("elegida");
    }
    aviso.textContent = "";
  }
  //dandole a la recla esc se desmarcan todas las butacas
  document.addEventListener("keydown", (evento) => {
    console.log("Tecla: ", evento.key);
    if (evento.key === "Escape") {
      desmarcarTodas();
    }
  });

  //evento para foco

  const ayuda = document.querySelector("#ayuda");

  codigo.addEventListener("focus", () => {
    //tiene el foco
    ayuda.textContent = "El código de descuento tiene 6 letras y 2 números";
  });
  codigo.addEventListener("blur", () => {
    //pierde el foco
    ayuda.textContent = "";
  });
}
//marcar butaca con teclas

document.addEventListener("keydown", (eventoNumero) => {
  const tecla = eventoNumero.key;

  const teclas = ["1", "2", "3", "4", "5", "6", "7", "8"];

  if (teclas.includes(tecla)) {
    const butaca = butacas[Number(tecla) - 1];
    console.log("Butaca seleccionada:", butaca);
    marcar(butaca);
    console.log("Clases:", butaca.className);
  }
});
