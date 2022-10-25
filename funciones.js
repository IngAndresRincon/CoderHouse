

function mostrarModal()
{
    
    // x.style.visibility = 'visible';

    var x = document.getElementById('divrow1');
    x.style.visibility = 'visible';
    // if (x.style.visibility === 'hidden') {
    //     x.style.visibility = 'visible';
    // } else {
    //   x.style.visibility = 'hidden';
    // }

}

function OcultarModal()
{
    var x = document.getElementById('divrow1');
    x.style.visibility = 'hidden';
}

let placa = "";
let email = "";
let nombre = "";
const valorDolar = 5000
function formularioAuto()
{
    let emailValido = false;
    let placaValida = false;
    let opcionSeguroValido = false;


    nombre = prompt("Por favor ingrese su nombre: ");

     while(!placaValida)
     {
        placa = prompt('Por favor ingrese la placa:')    
        placaValida = validarTamaño(placa)
        if(!placaValida)
        {
            alert('El tamaño de la placa debe ser de 6 caracteres')
        }
     }
    
    

    while (!emailValido)
    {
        console.log('Validacion email')
        email = prompt('Por favor ingrese un correo electrónico:')
        emailValido = validarEmail(email)
        if(!emailValido)
        {
            alert('Email no valido')
        }
    }
    
    

    while(!opcionSeguroValido)
    {
        let opcSeguro = parseInt( prompt("Sr(a) "+nombre+"\n"+ "Seleccione una opción:\n"+"1.Cotizar Seguro\n"+"2.Comprar Seguro\n"+"3.Renovar seguro\n") );
        switch(opcSeguro)
        {
          case 1:
              opcionSeguroValido=true;
              funCotizarSeguro()
            break;              
          case 2:
            opcionSeguroValido=true;
              funComprarSeguro()
            break;
          case 3:
            break;
           default:
            alert('Opción no válida')
            break;
    
        }

    }


}

function funComprarSeguro()
{
    let modelo = parseInt(prompt('Ingrese el módelo del vehículo: '))
    let valorSeguro = 0;
    switch(modelo)
    {
        case 2010:
        case 2011:
        case 2012:
        case 2013:
        case 2014: 
         valorSeguro = 1000000
          alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
        break;
 
        case 2015:
        case 2016:
        case 2017:
        case 2018:
        case 2019:
         valorSeguro = 1500000
         alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
        break;
 
        case 2020:
        case 2021:
        case 2022:
         valorSeguro = 2500000
         alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
        break;

        case 2023:
         valorSeguro = 3100000
         alert("El valor de seguro para el próximo años es: "+ valorSeguro/valorDolar + "dolares")
        default:
         alert('Módelo de vehículo no válido')
         break;
    }

    let opcCompra = parseInt(prompt("Comprar seguro:\n1. Si\n2. No"))

    if(opcCompra==1)
    {
        alert("Seguro Comprado!\n Sr(a) "+nombre+"\n"+"El vehículo de placa: "+placa+ " módelo: "+modelo+" compró un seguro por valor de: "+valorSeguro/valorDolar+" dolares");
    }
    else
    {
        alert("Compra cancelada")
    }
 
}

function funCotizarSeguro()
{
   let modelo = parseInt(prompt('Ingrese el módelo del vehículo: '))
   let valorSeguro = 0;
   switch(modelo)
   {
       case 2010:
       case 2011:
       case 2012:
       case 2013:
       case 2014: 
        valorSeguro = 1000000
         alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
       break;

       case 2015:
       case 2016:
       case 2017:
       case 2018:
       case 2019:
        valorSeguro = 1500000
        alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
       break;

       case 2020:
       case 2021:
       case 2022:
        valorSeguro = 2500000
        alert("El valor de seguro para su módelo es: "+ valorSeguro/valorDolar + "dolares")
       break;

       default:
        alert('Módelo de vehículo no válido')
        break;
   }

}


function validarTamaño(informacion)
{
    placaValida = false;
    if(informacion.length == 6)
    {
        console.log("Tamaño correcto")
        placaValida = true;      
    }
    else
    {
        placaValida = false;
    }

    return placaValida;

}

function validarEmail(email)
{
   let emailValido = false;
   console.log('Validando email:'+email)
   for(let i=0; i<= email.length; i++ )
   {
     if(email.charAt(i) =='@')
     {
        emailValido = true;
        break;
     }
   }

   return emailValido;
}

