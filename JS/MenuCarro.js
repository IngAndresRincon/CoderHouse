

let placa = "";
let nombre = "";
let documento = "";
let modelo = "";

let ccNombre ="";
let ccCardNumber ="";
let ccCCV ="";
let ccMes ="";
let ccAño ="";



let arrayCarro = [];

 let dolarhoy = 1;
// let dolarhoy = {"COP":"1"};

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





let elementocreado = false;
document.getElementById('btncomprarsegurocarro').addEventListener('click',function(){

    let emailValido = false;
    let placaValida = false;
    let opcionSeguroValido = false;
  
    nombre = document.getElementById('nombreRegistroVehiculo').value;
    placa = document.getElementById('placaRegistroVehiculo').value;
    documento = document.getElementById('documentoRegistroVehiculo').value;
    modelo = document.getElementById('selectmodeloVehiculo').value;
    

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

    if((nombre == "" || placa == "" || documento == "") )
    {
        console.log('Primera validacion')
        let mensajealerta = document.createElement("p");
        mensajealerta.innerText = "Campos no válidos";
        divalerta.append(mensajealerta);
        divalerta.style.display = "block";
        divalerta.style.padding = "0px";
         setTimeout(() => {
             divalerta.style.display = "none";
             divalerta.style.padding = "0px";
             divalerta.removeChild(mensajealerta)
           }, "4000")      

           let arraydolar =JSON.parse(JSON.stringify(dolarhoy.rates));
           console.log(arraydolar.COP);           
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
            setTimeout(() => {
                divalerta.style.display = "none";
                divalerta.style.padding = "0px";
              }, "3000")
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


document.getElementById('btncotizarsegurocarro').addEventListener('click',function(){
    
    nombre = document.getElementById('nombreRegistroVehiculo').value;
    placa = document.getElementById('placaRegistroVehiculo').value;
    documento = document.getElementById('documentoRegistroVehiculo').value;
    modelo = document.getElementById('selectmodeloVehiculo').value;

    if(nombre == "" || placa == "" || documento == "")
    {
        Swal.fire({
            icon:"info",
            title: "JS",
            text:"Campos no válidos",
            confirmButtonText: 'SI',            
        })
        return;
    }

    // dolarhoy =JSON.parse(JSON.stringify(dolarhoy.rates));


    let valorSeguroPorModelo = obtenerValorSeguro(modelo);
  

    Swal.fire({
        icon:"info",
        title: "Valor a pagar en dolares",
        text:"Total: "+Math.round(valorSeguroPorModelo)+" dolares",
        confirmButtonText: 'SI',            
    })





});


document.getElementById('btnPagarSeguroVehiculo').addEventListener('click',function(){

    let ccNombre = document.getElementById('ccName').value;
    let ccCardNumber = document.getElementById('cccreditcardnumber').value;
    let ccCCV = document.getElementById('ccCVV').value;
    let ccMes = document.getElementById('ccmonth').value;
    let ccAño = document.getElementById('ccyear').value;

    let ArraySegurosVehiculo = JSON.parse(localStorage.getItem("vehiculos"));
    if(ArraySegurosVehiculo == null)
    {
        ArraySegurosVehiculo = [];
    }else{
        let existe = false;
        let placaVehiculo = ArraySegurosVehiculo.find(function(e) {
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

 

    let valorSeguroPorModelo = obtenerValorSeguro(modelo);
    ArraySegurosVehiculo.push(new Carro(nombre,placa,Math.round(valorSeguroPorModelo),modelo,new FormaPago(ccAño,ccMes,ccCardNumber,ccCCV)));

    console.log(ArraySegurosVehiculo);


    localStorage.setItem("vehiculos", JSON.stringify(ArraySegurosVehiculo));

    Swal.fire({
        icon:"success",
        title: "JS",
        text:"Compra Completada",
    })


    setTimeout(() =>{
        let formcar = document.getElementById('divcarform');
        let completarpago = document.getElementById('divpagosegurocarro');
        formcar.style.display = "block";
        completarpago.style.display="none";
        document.getElementById('nombreRegistroVehiculo').value = "";
        document.getElementById('placaRegistroVehiculo').value= "";
        document.getElementById('documentoRegistroVehiculo').value= "";
        document.getElementById('selectmodeloVehiculo').value= "";

        document.getElementById('ccName').value = "";
        document.getElementById('cccreditcardnumber').value= "";
        document.getElementById('ccCVV').value= "";
        
        

    },1000)




})


function obtenerValorSeguro(modelo){

    let valorSeguro = 0;
    console.log(modelo);
         switch(parseInt(modelo))
         {
             case 2010:
             case 2011:
             case 2012:
             case 2013:
             case 2014: 
              valorSeguro = 200000               
             break;     
             case 2015:
             case 2016:
                valorSeguro = 400000
                break;
             case 2017:
             case 2018:
                valorSeguro = 600000
                break;
             case 2019:
             case 2020:
                valorSeguro = 800000
                break;
             case 2021:
             case 2022:
                valorSeguro = 1000000
                break;            
             default:
             alert('Módelo de vehículo no válido')
              break;
         }

        // dolarhoy =JSON.parse(JSON.stringify(dolarhoy.rates));
        
        return valorSeguro/dolarhoy.COP;
}

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



