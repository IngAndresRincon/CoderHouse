

const misProductos = ["pulsera","collar","anillo"];
let barticulo = false;
let articulo = "";

while(!barticulo)
{
    articulo = prompt("Ingrese articulo").toLowerCase();
    
    if((misProductos.find(validarArticulo)) && isNaN(articulo))
    {
        barticulo = true;
    }

}

function validarArticulo(art) {
    if(art === articulo){
        return true;
    }
}