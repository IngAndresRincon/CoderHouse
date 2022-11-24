


function formularioMoto()
{

    let placa = "";
    let email = "";
    let nombre = "";
    let documento = "";

    let emailValido = false;
    let placaValida = false;
    let opcionSeguroValido = false;

    // alert(dato.value);

    nombre = prompt("Por favor ingrese su nombre: ").trim();

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
}

