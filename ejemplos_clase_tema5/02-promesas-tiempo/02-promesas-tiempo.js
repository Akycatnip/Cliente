//El tiempo con PROMESAS

const coordenadas = {
    Córdoba: [37.89, -4.77],
    Sevilla: [37.39, -5.99],
    Granada: [37.18, -3.6],
};

const urlCordoba = "https://api.open-meteo.com/v1/forecast?latitude=37.89&longitude=-4.77&current=temperature_2m,wind_speed_10m";


const tiempo = document.querySelector("#tiempo");
const estado = document.querySelector("#estado");
const ciudad = document.querySelector("#ciudad");

//Hacemos una petición a una URL y nos devuelve una promesa
const promesa = fetch(urlCordoba); //petición al servidor
console.log(promesa);

//Cuando se cumple: then y json
tiempo.addEventListener("click", () => {
    estado.textContent = "Consultando...";
    const [latitud, longitud] = coordenadas[ciudad.value];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,wind_speed_10m`;

    //Petición fetch tengo que tener 2 then: 1 para la respuesta y otro para los datos
    fetch(url)
        .then((respuesta) => respuesta.json())//leemos el JSON que nos manda el server y lo convertimos 
        //en un objeto de JS
        //para poder acceder a los datos con el .
        .then((datos) => { //datos es lo q da json() al terminarse porque JSON tb hace un fetch
            console.log("DATOS: ");
            console.log(datos);
            estado.textContent = `${ciudad.value}: ${datos.current.temperature_2m} ºC, viento de ${datos.current.wind_speed_10m} km/h. `
        });
});



//URL INCORRECTA 
// const botonEquivocado = document.querySelector("#equivocado");

// botonEquivocado.addEventListener("click", () => {
//     estado.textContent = "consultando...";

//     fetch("bnjvor4bvotnvpntrp") //url equivocada
//         .then((respuesta) => respuesta.json())
//         .then((datos) => {
//             estado.textContent = `Han llegado ${datos}`;
//         })
//         .catch((error) => { //mostramos el error
//             estado.textContent = `No se ha podido consultar. ${error.message}`
//         });
// });
//

//------------------------------------------------------------------------------------------------
//Actividad 1 · La máxima de mañana
// En el ejemplo 02, mostrar también la temperatura máxima prevista para mañana en la ciudad
// elegida. Open-Meteo la da si se pide en el parámetro daily, con el valor temperature_2m_‐
// max, y la devuelve dentro de daily, en un array con un valor por día que empieza por hoy.

const daily = `https://api.open-meteo.com/v1/forecast?latitude=37.89&longitude=-4.77&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max`;


const botonEquivocado = document.querySelector("#equivocado");

botonEquivocado.addEventListener("click", () => {
    estado.textContent = "consultando...";

    fetch(daily)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            estado.textContent = `La temperatura de mañana va a ser:  ${datos.daily.temperature_2m_max[1]}ºC. `;
        })
        .catch((error) => { //mostramos el error
            estado.textContent = `No se ha podido consultar. ${error.message}`
        });
});
