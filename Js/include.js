/*ejercicio de includes 
  se le pone a el documento que va a utilizar el modulo type= module en el script de html asi deja utilizarlo*/

//include permite saber si se hay un elemento o no en un array  
let lista = ["uno", "dos", "tres"];
function include() {
    
    if (lista.includes("max")) {
        return console.log("si esta el numero");


    } else {
        return console.log("no funciona el codigo");
    }
}

include()

const caja = document.getElementsByClassName("caja__proyecto")
caja.style
