


let placa = "";
let nombre = "";
let documento = "";
let arrayCarro = [];


let elementocreado = false;
document.getElementById('btncomprarsegurocarro').addEventListener('click',function(){

    let emailValido = false;
    let placaValida = false;
    let opcionSeguroValido = false;
  
    nombre = document.getElementById('nombreRegistroVehiculo').value;
    placa = document.getElementById('placaRegistroVehiculo').value;
    documento = document.getElementById('documentoRegistroVehiculo').value;
    console.log(nombre,placa,documento);

    let divalerta = document.getElementById('divalertaFormularioCarro')

    console.log("Elemento:"+ elementocreado);
    if(elementocreado)
    {
        if(nombre == "" || placa == "" || documento == "")
        {
            divalerta.style.display = "block";
            divalerta.style.padding = "0px";
        }
        else
        {
            divalerta.style.display = "none";
            divalerta.style.padding = "0px";
        }
        
    }   

    if((nombre == "" || placa == "" || documento == "") && (!elementocreado))
    {
        console.log('Primera validacion')
        let mensajealerta = document.createElement("p");
        mensajealerta.innerText = "Campos no válidos";
        divalerta.append(mensajealerta);
        elementocreado = true;
        divalerta.style.display = "block";
        divalerta.style.padding = "0px";
        return;
    }
    else{


        placaValida = validarTamaño(placa)
        if(!placaValida)
        {
            let newalert = document.querySelector('#divalertaFormularioCarro');
            newalert.innerText = "Formato de placa no válida";
            divalerta.style.display = "block";
            divalerta.style.padding = "0px";
            return;
        }
        else{
            divalerta.style.display = "none";
            divalerta.style.padding = "0px";
        }
     
        Swal.fire({
            icon:"info",
            title: "JS",
            text:"¿Desea realizar la compra?",
            showDenyButton: true,
            confirmButtonText: 'SI',
            denyButtonText: 'NO',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            //   Swal.fire('Saved!', '', 'success')
              let formcar = document.getElementById('divcarform');
              let completarpago = document.getElementById('divpagosegurocarro');
              document.getElementById('ccName').value = document.getElementById('nombreRegistroVehiculo').value;
              formcar.style.display = "none";
              completarpago.style.display="block";
            } else if (result.isDenied) {
                
              Swal.fire('Changes are not saved', '', 'info')
              Event.preventDefault();
            }
        })
    }
 


})


document.getElementById('ccButtonReset').addEventListener('click',function(){

    document.getElementById('ccName').value ="";
    document.getElementById('cccreditcardnumber').value ="";
    document.getElementById('ccCVV').value ="";
})

document.getElementById('ccButtonCancel').addEventListener('click',function(){
    let formcar = document.getElementById('divcarform');
    let completarpago = document.getElementById('divpagosegurocarro');
    formcar.style.display = "block";
    completarpago.style.display="none";

})

document.getElementById('documentoRegistroVehiculo').addEventListener('keypress',function(e){
    e.preventDefault();
    let temporalDoc = document.getElementById('documentoRegistroVehiculo')
    console.log(e.key)
    let numberArray = [1,2,3,4,5,6,7,8,9,0]
    numberArray.forEach(function(i){
        if(i==e.key)
        {
            temporalDoc.value = temporalDoc.value+ e.key;
        }
    })
})

document.getElementById('cccreditcardnumber').addEventListener('keypress',function(e){
    e.preventDefault();
    let tempCreditCard = document.getElementById('cccreditcardnumber')
    if(tempCreditCard.value.length>16)
        return;
    console.log(e.key)
    let numberArray = [1,2,3,4,5,6,7,8,9,0]
    numberArray.forEach(function(i){
        if(i==e.key)
        {
            tempCreditCard.value = tempCreditCard.value+ e.key;
        }
    })
})


function formularioAuto()
{


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
        arrayCarro.push(newCar);
        console.log(arrayCarro);
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

