//poner como prestados los lirbos que tengan más de 10 caracteres

for (const libro of document.querySelectorAll(".libro")) {
  const titulo = libro.querySelector(".titulo").textContent;
  if (titulo.length > 10) {
    libro.classList.add("prestado");
  }
}
