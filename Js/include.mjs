/*ejercicio de includes 
  se le pone a el documento que va a utilizar el modulo type= module en el script de html asi deja utilizarlo*/

//include permite saber si se hay un elemento o no en un array  
let lista = ["uno", "dos", "tres"];
function include() {
    
    if (lista.includes("uno")) {
        return console.log("si esta el numero");


    } else {
        return console.log("no funciona el codigo");
    }
}


export {include, lista};