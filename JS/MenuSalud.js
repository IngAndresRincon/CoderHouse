
let nombres = "";
let apellidos = "";
let tipodocumento = "";
let numeroidentificacion = "";
let edad = "";
let correo = "";
let celular = "";
let objcotizacionSeguro ="";
let dolarhoy = 1;

window.addEventListener("load", (e) => {


     fetch('https://api.currencyfreaks.com/latest?apikey=aa5cc937bde142639319424f0f4646f0',{
         method: "GET",
        })
        // Exito
       .then(response => response.json())  // convertir a json
        .then(json => dolarhoy =JSON.parse(JSON.stringify(json.rates)))    //imprimir los datos en la consola
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

  // setInterval(() => {
      
   


  // }, 2000);


});



document.getElementById('btncomprarsegurosalud').addEventListener('click',function(){

    nombres = document.getElementById('nombresegurosalud').value;
    apellidos = document.getElementById('apellidossegurosalud').value;
    tipodocumento = document.getElementById('selecttipodocumento').value;
    numeroidentificacion = document.getElementById('numerodocumentosegurosalud').value;
    edad = document.getElementById('selectedad').value;
    correo = document.getElementById('correosegurosalud').value;
    celular = document.getElementById('celularsegurosalud').value;

    if(nombres == '' || apellidos == '' || numeroidentificacion == '' || correo == '' || celular == '')
    {
        let divAlert = document.getElementById('divalertaFormularioSalud');
        let newElement = document.createElement('p');
        newElement.innerText = 'Algunos campos estan sin completar ';
        divAlert.append(newElement);
        divAlert.style.display = "block";
        divAlert.style.padding = "0px";
        setTimeout(() =>{
            divAlert.style.display = "none";
            divAlert.removeChild(newElement);

        },3000)
        return;

    }

    console.log('Validando Email');
    let emailValido = validarEmail(correo);
    if(!emailValido)
    {
        let divAlert = document.getElementById('divalertaFormularioSalud');
        let newElement = document.createElement('p');
        newElement.innerText = 'Email no válido';
        divAlert.append(newElement);
        divAlert.style.display = "block";
        divAlert.style.padding = "0px";
        setTimeout(() =>{
            divAlert.style.display = "none";
            divAlert.removeChild(newElement);

        },3000)
        return;

    }

    objcotizacionSeguro = obtenervalorseguroSalud(edad);
    console.log(objcotizacionSeguro);

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
          let formsalud = document.getElementById('divsaludform');
          let completarpago = document.getElementById('divpagosegurosalud');
          document.getElementById('ccName').value = nombres+" "+apellidos;  
          formsalud.style.display = "none";
          completarpago.style.display="block";
        } 
    })



})

document.getElementById('ccButtonCancel').addEventListener('click',function(){

    let formsalud = document.getElementById('divsaludform');
    let completarpago = document.getElementById('divpagosegurosalud');
    formsalud.style.display = "block";
    completarpago.style.display="none";

})

document.getElementById('ccButtonReset').addEventListener('click',function(){
    document.getElementById('ccName').value = "";
    document.getElementById('cccreditcardnumber').value = "";
    document.getElementById('ccCVV').value = "";

})



document.getElementById('btncotizarsegurosalud').addEventListener('click',function(){
    nombres = document.getElementById('nombresegurosalud').value;
    apellidos = document.getElementById('apellidossegurosalud').value;
    tipodocumento = document.getElementById('selecttipodocumento').value;
    numeroidentificacion = document.getElementById('numerodocumentosegurosalud').value;
    edad = document.getElementById('selectedad').value;
    correo = document.getElementById('correosegurosalud').value;
    celular = document.getElementById('celularsegurosalud').value;

    if(nombres == '' || apellidos == '' || numeroidentificacion == '' || correo == '' || celular == '')
    {
        Swal.fire({
            icon:"error",
            title: "JS",
            text:"Algunos campos estan sin completar",
        })
        return;
    }

    objcotizacionSeguro = obtenervalorseguroSalud(edad);
    console.log(objcotizacionSeguro);


    Swal.fire({
        icon:"info",
        title: "JS",
        text:"El aporte anual debe ser de "+currencyFormatter("USD",(objcotizacionSeguro.valoraporteaño/dolarhoy.COP))+" dolares; el total de cobertura del seguro es "+currencyFormatter("USD",(objcotizacionSeguro.valorseguro/dolarhoy.COP))+" dolares",
    })

})


document.getElementById('btnPagarSeguroSalud').addEventListener('click',function(){

    let ccNombre = document.getElementById('ccName').value;
    let ccCardNumber = document.getElementById('cccreditcardnumber').value;
    let ccCCV = document.getElementById('ccCVV').value;
    let ccMes = document.getElementById('ccmonth').value;
    let ccAño = document.getElementById('ccyear').value;

    let ArraySegurosSalud = JSON.parse(localStorage.getItem("salud"));
    if(ArraySegurosSalud == null)
    {
        ArraySegurosSalud = [];
    }else{
        let existe = false;
        let placaMoto = ArraySegurosSalud.find(function(e) {
                if(e.tipodocumento == tipodocumento && e.numerodocumento == numeroidentificacion)
                {
                    existe = true;
                }                
        });

        if(existe)
        {
            Swal.fire({
                icon:"error",
                title: "JS",
                text:"El usuario con número de documento "+tipodocumento+". "+numeroidentificacion+ "ya cuenta con un seguro",
            })
            return;
        }


    }


    if(ccNombre == '' || ccCardNumber == '' || ccCCV == '')
    {
        let divalerta = document.getElementById('divAlertCC');
        let newElementAlert = document.createElement('p');
        newElementAlert.innerText="Hay campos sin completar";
        divalerta.append(newElementAlert);
        divalerta.style.display="block";
        divalerta.style.padding= "0px";
        setTimeout(() => {
            divalerta.style.display="none";
            divalerta.removeChild(newElementAlert);
        }, 3000);
        return;

    }

 
    console.log(objcotizacionSeguro);

    // console.log(dolarhoy);
    // let temp_valorseguro = (parseInt(objcotizacionSeguro.valorseguro)/dolarhoy.COP);
    // let temp_valoraporte = (parseInt(objcotizacionSeguro.valoraporteaño)/dolarhoy.COP);
    // console.log(temp_valorseguro+" "+temp_valoraporte);

    ArraySegurosSalud.push(new Salud(nombres,apellidos,edad,correo,tipodocumento,numeroidentificacion,(objcotizacionSeguro.valorseguro/dolarhoy.COP),(objcotizacionSeguro.valoraporteaño/dolarhoy.COP),new FormaPago(ccAño,ccMes,ccCardNumber,ccCCV)));
    console.log(ArraySegurosSalud);

     localStorage.setItem("salud", JSON.stringify(ArraySegurosSalud));
     Swal.fire({
           icon:"success",
           title: "JS",
           text:"Compra Completada",
       })


         setTimeout(() =>{
             let formsalud = document.getElementById('divsaludform');
             let completarpago = document.getElementById('divpagosegurosalud');
             formsalud.style.display = "block";
             completarpago.style.display="none";
          document.getElementById('nombresegurosalud').value = "";
          document.getElementById('apellidossegurosalud').value= "";
          document.getElementById('numerodocumentosegurosalud').value= "";
          document.getElementById('correosegurosalud').value= "";
          document.getElementById('celularsegurosalud').value= "";

          document.getElementById('ccName').value = "";
          document.getElementById('cccreditcardnumber').value= "";
          document.getElementById('ccCVV').value= "";       
        

      },1000)




})




document.getElementById('numerodocumentosegurosalud').addEventListener('keypress',function(e){
    e.preventDefault();
    let temporalDoc = document.getElementById('numerodocumentosegurosalud')
    console.log(e.key)
    let numberArray = [1,2,3,4,5,6,7,8,9,0]
    numberArray.forEach(function(i){
        if(i==e.key)
        {
            temporalDoc.value = temporalDoc.value+ e.key;
        }
    })
  })


  
document.getElementById('celularsegurosalud').addEventListener('keypress',function(e){
    e.preventDefault();
    let temporalDoc = document.getElementById('celularsegurosalud')
    console.log(e.key)
    let numberArray = [1,2,3,4,5,6,7,8,9,0]
    numberArray.forEach(function(i){
        if(i==e.key)
        {
            temporalDoc.value = temporalDoc.value+ e.key;
        }
    })
  })


function obtenervalorseguroSalud(edad){

    
    let valorseguro = 0;
    let valoraporteaño = 0;
    console.log(edad);

    if(edad<50)
    {
        valorseguro = 300000000;
        valoraporteaño = 2454000
    }
    else if(edad >= 50)
    {
        valorseguro = 540000000;
        valoraporteaño = 6872000
    }
       

    let objvalorSeguro =  {"valorseguro":valorseguro,"valoraporteaño":valoraporteaño};
    return objvalorSeguro;
}

function currencyFormatter( currency, value) {
    console.log(currency+value);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }