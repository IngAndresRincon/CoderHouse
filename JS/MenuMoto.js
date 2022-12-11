let nombre = "";
let email = "";
let numCelular = "";
let placa = "";
let modelo = "";
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



document.getElementById('btncomprarsegurocarro').addEventListener('click',function(){

    nombre = document.getElementById('nombreFormMoto').value;
    email =document.getElementById('emailFormMoto').value;
    numCelular = document.getElementById('numCelularFormMoto').value;
    placa = document.getElementById('placaFormmoto').value;
    modelo = document.getElementById('selectmodeloMoto').value;


    console.log(nombre);
        // alert(dato.value);
    if(nombre == '' || email =='' || numCelular == '' || placa == '')
    {
        let divAlert = document.getElementById('divalertaFormularioMoto');
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
    let emailValido = validarEmail(email);
    if(!emailValido)
    {
        let divAlert = document.getElementById('divalertaFormularioMoto');
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

    if(!validarTamaño(placa))
    {
        let divAlert = document.getElementById('divalertaFormularioMoto');
        let newElement = document.createElement('p');
        newElement.innerText = 'La placa debe ser de 6 caracteres';
        divAlert.append(newElement);
        divAlert.style.display = "block";
        divAlert.style.padding = "0px";
        setTimeout(() =>{
            divAlert.style.display = "none";
            divAlert.removeChild(newElement);

        },3000)
        return;

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
                
            let divPagoTarjeta = document.getElementById('divpagoseguromoto');
            let divFormMoto = document.getElementById('divMotoFormulario');
            divFormMoto.style.display = "none";
            divPagoTarjeta.style.display='block';
            document.getElementById('ccName').value = nombre;  
        

        } 
    })

    
})



document.getElementById('btnPagarSeguroMoto').addEventListener('click',function(){

    let ccNombre = document.getElementById('ccName').value;
    let ccCardNumber = document.getElementById('cccreditcardnumber').value;
    let ccCCV = document.getElementById('ccCVV').value;
    let ccMes = document.getElementById('ccmonth').value;
    let ccAño = document.getElementById('ccyear').value;

    let ArraySegurosMotos = JSON.parse(localStorage.getItem("motos"));
    if(ArraySegurosMotos == null)
    {
        ArraySegurosMotos = [];
    }else{
        let existe = false;
        let placaMoto = ArraySegurosMotos.find(function(e) {
                if(e.placa == placa)
                {
                    existe = true;
                }                
        });

        if(existe)
        {
            Swal.fire({
                icon:"error",
                title: "JS",
                text:"La placa "+placa+" ya cuenta con un seguro",
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

 

     let valorSeguroPorModelo = obtenerValorSeguroMoto(modelo);
     ArraySegurosMotos.push(new Moto(nombre,email,placa,Math.round(valorSeguroPorModelo),modelo,new FormaPago(ccAño,ccMes,ccCardNumber,ccCCV)));

    console.log(ArraySegurosMotos);

    // console.log(ArraySegurosVehiculo);


     localStorage.setItem("motos", JSON.stringify(ArraySegurosMotos));

     Swal.fire({
         icon:"success",
         title: "JS",
         text:"Compra Completada",
     })


     setTimeout(() =>{
        let divPagoTarjeta = document.getElementById('divpagoseguromoto');
        let divFormMoto = document.getElementById('divMotoFormulario');
        divFormMoto.style.display = "block";
        divPagoTarjeta.style.display='none';
        document.getElementById('nombreFormMoto').value = "";
        document.getElementById('emailFormMoto').value= "";
        document.getElementById('numCelularFormMoto').value= "";
        document.getElementById('placaFormmoto').value= "";
        document.getElementById('selectmodeloMoto').value= "";

        document.getElementById('ccName').value = "";
        document.getElementById('cccreditcardnumber').value= "";
        document.getElementById('ccCVV').value= "";       
        

     },1000)




})



document.getElementById('ccButtonReset').addEventListener('click',function(){
    document.getElementById('ccName').value = "";
    document.getElementById('cccreditcardnumber').value = "";
    document.getElementById('ccCVV').value = "";

})


document.getElementById('ccButtonCancel').addEventListener('click',function(){

  let divPagoTarjeta = document.getElementById('divpagoseguromoto');
    let divFormMoto = document.getElementById('divMotoFormulario');
    divFormMoto.style.display = "block";
    divPagoTarjeta.style.display='none';
    
})


document.getElementById('btncotizarsegurocarro').addEventListener('click',function(){

    nombre = document.getElementById('nombreFormMoto').value;
    email =document.getElementById('emailFormMoto').value;
    numCelular = document.getElementById('numCelularFormMoto').value;
    placa = document.getElementById('placaFormmoto').value;
    modelo = document.getElementById('selectmodeloMoto').value;
    
        // alert(dato.value);
    if(nombre == '' || email =='' || numCelular == '' || placa == '')
    {
        Swal.fire({
            icon:"error",
            title: "JS",
            text:"Algunos campos estan sin completar",
        })
        return;
    }

    
    let valorseguroMoto =obtenerValorSeguroMoto(modelo);

    Swal.fire({
        icon:"info",
        title: "JS",
        text:"El valor del seguro es "+valorseguroMoto+" dolares",
    })

    console.log(valorseguroMoto);
    

})


document.getElementById('numCelularFormMoto').addEventListener('keypress',function(e){
    e.preventDefault();
    let temporalDoc = document.getElementById('numCelularFormMoto')
    console.log(e.key)
    let numberArray = [1,2,3,4,5,6,7,8,9,0]
    numberArray.forEach(function(i){
        if(i==e.key)
        {
            temporalDoc.value = temporalDoc.value+ e.key;
        }
    })
  })



  
function obtenerValorSeguroMoto(modelo){

    let valorSeguro = 0;
    console.log(modelo);
         switch(parseInt(modelo))
         {
             case 2010:
             case 2011:
                valorSeguro = 100000;
                break;
             case 2012:
             case 2013:
                valorSeguro = 200000;
                break;
             case 2014: 
              valorSeguro = 250000;
             break;     
             case 2015:
             case 2016:
                valorSeguro = 310000;
                break;
             case 2017:
             case 2018:
                valorSeguro = 420000;
                break;
             case 2019:
             case 2020:
                valorSeguro = 610000;
                break;
             case 2021:
             case 2022:
                valorSeguro = 850000;
                break;            
             default:
             alert('Módelo de vehículo no válido')
              break;
         }

        // dolarhoy =JSON.parse(JSON.stringify(dolarhoy.rates));
        
        return valorSeguro/dolarhoy.COP;
}
