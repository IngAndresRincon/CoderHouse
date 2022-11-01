

function mostrarModal()
{
    
    // x.style.visibility = 'visible';

    let x = document.getElementById('divrow1');
    x.style.visibility = 'visible';
    // if (x.style.visibility === 'hidden') {
    //     x.style.visibility = 'visible';
    // } else {
    //   x.style.visibility = 'hidden';
    // }

}

function OcultarModal()
{
    let x = document.getElementById('divrow1');
    x.style.visibility = 'hidden';
}

let placa = "";
let email = "";
let nombre = "";
const valorDolar = 5000
function formularioAuto(dato)
{
    let emailValido = false;
    let placaValida = false;
    let opcionSeguroValido = false;

    // alert(dato.value);

    nombre = prompt("Por favor ingrese su nombre: ").trim();

     while(!placaValida)
     {
        placa = prompt('Por favor ingrese la placa:').trim()  
        placaValida = validarTamaño(placa)
        if(!placaValida)
        {
            alert('El tamaño de la placa debe ser de 6 caracteres')
        }
     }
    
    

    while (!emailValido)
    {
        console.log('Validacion email')
        email = prompt('Por favor ingrese un correo electrónico:').trim()
        emailValido = validarEmail(email)
        if(!emailValido)
        {
            alert('Email no valido')
        }
    }
    
    

    while(!opcionSeguroValido)
    {
        let opcSeguro = parseInt( prompt("Sr(a) "+nombre+"\n"+ "Seleccione una opción:\n"+"1.Cotizar Seguro\n"+"2.Comprar Seguro\n"+"3.Renovar seguro\n"+"4.Salir") );
        let newCar = new Carro(nombre,placa,email);
        switch(opcSeguro)
        {
          case 1:
                opcionSeguroValido=true;
                newCar.funComprarSeguro();
            break;              
          case 2:
                opcionSeguroValido=true;
                newCar.funCotizarSeguro();
            break;
          case 3:
            break;
          case 4:
            alert('El programa terminará')
            break;
           default:
            alert('Opción no válida')
            break;
    
        }

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

