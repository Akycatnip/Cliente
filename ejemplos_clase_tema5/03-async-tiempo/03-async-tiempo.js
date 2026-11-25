//ASYNC Y AWAIT Y CON TRY CATCH
const urlCordoba = "https://api.open-meteo.com/v1/forecast?latitude=37.89&longitude=-4.77&current=temperature_2m,wind_speed_10m";

const estado = document.querySelector("#estado");

async function tiempoEnCordoba() {
    estado.textContent = "Consultando...";
    const respuesta = await fetch(urlCordoba);
    const datos = await respuesta.json();

    estado.textContent = `Córdoba: ${datos.current.temperature_2m} ºC.`;

}
document.querySelector("#cordoba").addEventListener("click", tiempoEnCordoba);

//que el server nos conteste con un error
//despues de un fetch, siempre antes de tocar sus datos tenemos
//que mirar respuesta.ok

async function latitudImposible() {
    estado.textContent = "Consultando...";

    try {

        const respuesta = await fetch("https://api.open-meteo.com/v1/forecast?latitude=300007.89&longitude=-4.77&current=temperature_2m,wind_speed_10m");
        if (!respuesta.ok) {
            throw new Error(`Código ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        estado.textContent = `${datos.current.temperature_2m} ºC.`;

    } catch (error) {
        estado.textContent = `No se ha podido consultar . ${error.message}`;
    }
}

document.querySelector("#imposible").addEventListener("click", latitudImposible);

//--------------------------------------------------------------------------------------------------
// Actividad 2 · Comparar dos ciudades
// En el ejemplo 03, el botón «Comparar Córdoba y Sevilla» no hace nada. Hacer que pida a la
// vez el tiempo de las dos ciudades y escriba en el párrafo comparacion cuál de las dos tiene
// más temperatura. Si alguna de las dos consultas falla, el párrafo tiene que decirlo.


const urlSevilla = "https://api.open-meteo.com/v1/forecast?latitude=37.89&longitude=-5.99&current=temperature_2m,wind_speed_10m";
const comparar = document.querySelector("#comparar");
const comparacion = document.querySelector("#comparacion");
comparar.addEventListener("click", compararLasDos);



//así no me decía cual de las dos fallaba
// async function compararLasDos() {
//     comparacion.textContent = "Consultando...";
//     try {
//         const [respuestaCordoba, respuestaSevilla] = await Promise.all([fetch(urlCordoba), fetch(urlSevilla)]);
//         if (!respuestaCordoba.ok) {
//             throw new Error(`Ha fallado la consulta de Córdoba. Código: ${respuestaCordoba.status}`);
//         }

//         if (!respuestaSevilla.ok) {
//             throw new Error(`Ha fallado la consulta de Sevilla. Código: ${respuestaSevilla.status}`);
//         }

//         const cordoba = await respuestaCordoba.json();
//         const sevilla = await respuestaSevilla.json();
//         comparacion.textContent = `En Córdoba hacen ${cordoba.current.temperature_2m} ºC. Y en Sevilla ${sevilla.current.temperature_2m} ºC`;

//     } catch (error) {
//         comparacion.textContent = `No se ha podido consultar . ${error.message}`;
//     }

// }

async function compararLasDos() {
    comparacion.textContent = "Consultando...";

    try {
        const [respuestaCordoba, respuestaSevilla] = await Promise.all([
            fetch(urlCordoba).catch(() => {
                throw new Error("Ha fallado la conexión con Córdoba");
            }),
            fetch(urlSevilla).catch(() => {
                throw new Error("Ha fallado la conexión con Sevilla");
            })
        ]);

        if (!respuestaCordoba.ok) {
            throw new Error(`Ha fallado Córdoba. Código: ${respuestaCordoba.status}`);
        }

        if (!respuestaSevilla.ok) {
            throw new Error(`Ha fallado Sevilla. Código: ${respuestaSevilla.status}`);
        }

        const cordoba = await respuestaCordoba.json();
        const sevilla = await respuestaSevilla.json();

        comparacion.textContent = `En Córdoba hacen ${cordoba.current.temperature_2m} ºC. Y en Sevilla ${sevilla.current.temperature_2m} ºC`;

    } catch (error) {
        comparacion.textContent = `No se ha podido consultar. ${error.message}`;
    }
}