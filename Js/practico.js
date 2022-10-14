
let disminuir = document.querySelector("#btn-disminuir");
let resetear = document.querySelector("#btn-resetear");
let incrementar = document.querySelector("#btn-incrementar");
let h1 = document.querySelector("#resultado")

let resultado = 0;

incrementar.addEventListener("click", incrementarNumero);
disminuir.addEventListener("click", disminuirNumero)
resetear.addEventListener("click", limpiar)

function limpiar(){
    resultado = 0;
    h1.textContent= `${resultado}`;
}

function incrementarNumero() {
    resultado = resultado + 1;
    h1.textContent= `${resultado}`;
    
    
}

function disminuirNumero() {
    
    if(resultado > 0) {
        resultado = resultado - 1;
        h1.textContent= `${resultado}`; 
    }    
}

/*ejercicio de includes 
  se le pone a el documento que va a utilizar el modulo type= module en el script de html asi deja utilizarlo*/
 import {include, lista} from './include.mjs';

 /*for (let i = 0; i<100; i++){
    const node = document.createElement("input")
    document.body.append(node)

 }*/
 /* const nodos =[]
 for (let i = 0; i<100; i++){
    const node = document.createElement("input")
    nodos.push(node)
    document.body.append(...nodos) --> se agrega a una lista, ya que los nodos son array
}
console.log(nodos)*/
 





