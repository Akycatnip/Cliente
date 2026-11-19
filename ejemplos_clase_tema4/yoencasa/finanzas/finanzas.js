import { movimientos } from "./movimientos.js";

//Seleccionamos los elementos del HTML
const listaMovimientos = document.querySelector("#movimientos");
const buscador = document.querySelector("#buscador");
const filtroTipo = document.querySelector("#filtroTipo");
const filtroCategoria = document.querySelector("#filtroCategoria");

const totalIngresos = document.querySelector("#totalIngresos");
const totalGastos = document.querySelector("#totalGastos");
const saldo = document.querySelector("#saldo");

const formulario = document.querySelector("#formulario");
const campos = formulario.querySelectorAll("input, select");
const botonLimpiar = document.querySelector("#limpiar");
const aviso = document.querySelector("#aviso");
const contador = document.querySelector("#contador");


// ==========================================
// FUNCIONES
// ==========================================

//Función para guardar los movimientos en localStorage
function guardar(){
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}


//Vamos a cargar los movimientos guardados
const guardado = localStorage.getItem("movimientos");

if(guardado !== null){
    movimientos.splice(0, movimientos.length, ...JSON.parse(guardado));
}


//Función para calcular los ingresos
function calcularIngresos(){

    const ingresos = movimientos.reduce((suma, mov) => {
        if(mov.tipo === "ingreso"){
            return suma + Number(mov.importe);
        }
        return suma;
    }, 0);

    return ingresos;
}


//Función para calcular los gastos
function calcularGastos(){

    const gastos = movimientos.reduce((suma, mov) => {
        if(mov.tipo === "gasto"){
            return suma + Number(mov.importe);
        }
        return suma;
    }, 0);

    return gastos;
}


//Función para pintar los totales
function pintarTotales(){

    const ingresos = calcularIngresos();
    const gastos = calcularGastos();
    const resultado = ingresos - gastos;

    totalIngresos.textContent = ingresos.toFixed(2) + " €";
    totalGastos.textContent = gastos.toFixed(2) + " €";
    saldo.textContent = resultado.toFixed(2) + " €";
}


//Función para comprobar cada campo del formulario
function comprobar(campo){

    //Buscamos el span.error que pertenece a ese campo
    const parrafo = campo.closest(".campo");
    const error = parrafo.querySelector(".error");

    const valor = campo.value.trim();

    //Comprobamos el concepto
    if(campo.id === "concepto"){
        if(valor === ""){
            error.textContent = "El concepto es obligatorio";
        }else if(valor.length < 3){
            error.textContent = "Mínimo 3 caracteres";
        }else{
            error.textContent = "";
        }
    }

    //Comprobamos el tipo
    else if(campo.id === "tipo"){
        if(valor === ""){
            error.textContent = "Selecciona un tipo";
        }else{
            error.textContent = "";
        }
    }

    //Comprobamos la categoría
    else if(campo.id === "categoria"){
        if(valor === ""){
            error.textContent = "Selecciona una categoría";
        }else{
            error.textContent = "";
        }
    }

    //Comprobamos el importe
    else if(campo.id === "importe"){
        if(valor === ""){
            error.textContent = "El importe es obligatorio";
        }else if(isNaN(Number(valor)) || Number(valor) <= 0){
            error.textContent = "Debe ser mayor que 0";
        }else if(Number(valor) > 100000){
            error.textContent = "El máximo es 100000 €";
        }else{
            error.textContent = "";
        }
    }

    //Comprobamos la fecha
    else if(campo.id === "fecha"){

        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        const fechaActual = `${anio}-${mes}-${dia}`;

        if(valor === ""){
            error.textContent = "La fecha es obligatoria";
        }else if(valor > fechaActual){
            error.textContent = "La fecha no puede ser futura";
        }else{
            error.textContent = "";
        }
    }

    //Devolvemos si el campo es correcto
    return error.textContent === "";
}



// ==========================================
// PINTAR MOVIMIENTOS
// ==========================================

function pintar(){

    //Lo primero que hacemos es limpiar la lista
    for(const item of listaMovimientos.querySelectorAll("li")){
        item.remove();
    }

    //Ordenamos los movimientos por fecha, del más reciente al más antiguo
    movimientos.sort((a,b) => b.fecha.localeCompare(a.fecha));

    for(let i = 0; i < movimientos.length; i++){

        const movimiento = document.createElement("li");

        //Creamos los datos del movimiento
        const datos = document.createElement("div");
        datos.classList.add("datos-movimiento");

        const concepto = document.createElement("strong");
        concepto.textContent = movimientos[i].concepto;

        const detalle = document.createElement("small");
        detalle.textContent = `${movimientos[i].categoria} - ${movimientos[i].tipo} - ${movimientos[i].fecha}`;

        datos.append(concepto, detalle);

        //Creamos el importe
        const importe = document.createElement("span");
        importe.classList.add("importe-movimiento");

        importe.textContent = Number(movimientos[i].importe).toFixed(2) + " €";

        //Diferenciamos los ingresos de los gastos
        importe.classList.add(movimientos[i].tipo);

        //Recogemos los valores de los filtros
        const texto = buscador.value.toLowerCase().trim();
        const tipoDesplegable = filtroTipo.value;
        const categoriaDesplegable = filtroCategoria.value;

        //Comprobamos si cumple el buscador
        if(!movimientos[i].concepto.toLowerCase().includes(texto)){
            movimiento.classList.add("oculto");
        }

        //Comprobamos el filtro de tipo
        if(tipoDesplegable !== "todos" && movimientos[i].tipo !== tipoDesplegable){
            movimiento.classList.add("oculto");
        }

        //Comprobamos el filtro de categoría
        if(categoriaDesplegable !== "todas" && movimientos[i].categoria !== categoriaDesplegable){
            movimiento.classList.add("oculto");
        }

        //Creamos el botón eliminar
        const eliminar = document.createElement("button");
        eliminar.classList.add("boton-eliminar");
        eliminar.textContent = "X";
        eliminar.type = "button";

        eliminar.addEventListener("click", () => {

            //Pedimos confirmación
            if(!confirm("¿Quieres eliminar este movimiento?")){
                return;
            }

            //Buscamos el movimiento por su id
            const id = movimientos[i].id;
            const posicion = movimientos.findIndex(m => m.id === id);

            //Eliminamos el movimiento
            movimientos.splice(posicion, 1);

            guardar();
            pintar();
            pintarTotales();
        });

        //Añadimos los elementos al li
        movimiento.append(datos, importe, eliminar);

        //Añadimos el li a la lista
        listaMovimientos.append(movimiento);
    }

    //Actualizamos el contador
    const visibles = listaMovimientos.querySelectorAll("li:not(.oculto)").length;
    contador.textContent = `${visibles} movimientos encontrados`;

}



// ==========================================
// VALIDAR EL FORMULARIO
// ==========================================

//Comprobamos los campos cuando pierden el foco
for(const campo of campos){
    campo.addEventListener("blur", () => {
        comprobar(campo);
    });
}


//Comprobamos los campos cuando se modifican
for(const campo of campos){
    campo.addEventListener("input", () => {
        comprobar(campo);
    });
}



// ==========================================
// REGISTRAR NUEVO MOVIMIENTO
// ==========================================

formulario.addEventListener("submit", (evento) => {

    //Evitamos que se recargue la página
    evento.preventDefault();

    //Comprobamos todos los campos del formulario
    let correcto = true;

    for(const campo of campos){
        if(!comprobar(campo)){
            correcto = false;
        }
    }

    if(!correcto){
        aviso.textContent = "Hay datos por corregir";
        return;
    }

    //Recogemos todos los datos del formulario
    const datos = Object.fromEntries(new FormData(formulario));

    //Convertimos el importe a número
    datos.importe = Number(datos.importe);

    //Generamos un identificador único
    let idNuevo = 1;

    for(let i = 0; i < movimientos.length; i++){
        if(Number(movimientos[i].id) >= idNuevo){
            idNuevo = Number(movimientos[i].id) + 1;
        }
    }

    datos.id = idNuevo;

    //Añadimos el nuevo movimiento
    movimientos.push(datos);

    //Guardamos los cambios
    guardar();

    //Actualizamos la página
    pintar();
    pintarTotales();

    //Limpiamos el formulario
    formulario.reset();

    //Limpiamos los mensajes de error
    for(const campo of campos){
        campo.parentElement.querySelector(".error").textContent = "";
    }

    aviso.textContent = "Movimiento añadido correctamente";

});



// ==========================================
// VACIAR TODOS LOS MOVIMIENTOS
// ==========================================

botonLimpiar.addEventListener("click", () => {

    //Si no hay movimientos no hacemos nada
    if(movimientos.length === 0){
        return;
    }

    //Pedimos confirmación
    if(!confirm("¿Quieres eliminar todos los movimientos?")){
        return;
    }

    //Vaciamos el array
    movimientos.splice(0, movimientos.length);

    guardar();
    pintar();
    pintarTotales();

    aviso.textContent = "Todos los movimientos han sido eliminados";

});



// ==========================================
// EVENTOS DEL BUSCADOR Y LOS FILTROS
// ==========================================

//Buscamos mientras escribimos
buscador.addEventListener("input", () => {
    pintar();
});

//Filtramos por tipo
filtroTipo.addEventListener("change", () => {
    pintar();
});

//Filtramos por categoría
filtroCategoria.addEventListener("change", () => {
    pintar();
});

//Limpiamos el buscador al pulsar Escape
buscador.addEventListener("keydown", (evento) => {

    if(evento.key === "Escape"){
        buscador.value = "";
        pintar();
    }

});



// ==========================================
// INICIALIZAMOS LA PÁGINA
// ==========================================

pintar();
pintarTotales();
