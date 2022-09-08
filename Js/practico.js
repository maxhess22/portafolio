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



