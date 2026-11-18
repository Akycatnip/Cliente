//con el codigo html del ejemplo 3 y el array del apartado 3.4, mostrar en la lista unicamente los libros disponibles,
// uno por elemento, y en el parrafo cuantos son en total

const libros = [
  {
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    disponible: true,
  },
  { titulo: "El Quijote", autor: "Miguel de Cervantes", disponible: false },
  { titulo: "Rayuela", autor: "Julio Cortázar", disponible: true },
  { titulo: "Pedro Páramo", autor: "Juan Rulfo", disponible: false },
];

const catalogo = document.querySelector("#catalogo");
const disponibles = libros.filter((l) => l.disponible); //ya tengo un subarray con los disponibles

for (const d of disponibles) {
  const item = document.createElement("li");
  item.textContent = `${d.titulo} - ${d.autor} - ${d.disponible}`;
  catalogo.append(item);
}
const resumen = document.querySelector("#resumen");
if (disponibles.length > 0) {
  resumen.textContent = `${disponibles.length} libro/s disponible/s de ${libros.length}`;
}
