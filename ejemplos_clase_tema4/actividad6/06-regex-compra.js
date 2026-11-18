const formulario = document.querySelector("#compra");
const aviso = document.querySelector("#aviso");
const telefono = formulario.querySelector("#telefono");



//haciendo uso solo de la comprobación del html
// formulario.addEventListener("submit", (evento)=>{
//     evento.preventDefault();
//     if(!formulario.checkValidity()){
//         aviso.textContent = "Hay campos por corregir";
//         return;
//     }
//     aviso.textContent = `Compra realizada, la confirmación llegará a ${telefono.value}`

// })

//probar un patrón o expresión regular

const movil = /^[67]\d{8}$/; //8 dígitos y q empiece por 6 o 7

const pruebas = ["654987321", "745685963", "888555222", "6558"];

for(const p of pruebas){
    console.log(p, movil.test(p));
}

//vamos a usar en  mi formulario el test
formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    if(telefono.value !=="" ||  movil.test(telefono.value)){
        aviso.textContent = "Error: el teléfono está vacío o es incorrecto.";

    }else{
        aviso.textContent = "";
    }
})

