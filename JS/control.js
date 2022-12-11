
// document.getElementById('view1').addEventListener('mouseover', function(){
  
//      let x = document.getElementById('divrow1');
//      x.style.visibility = 'visible';
// })

// document.getElementById('divrow1').addEventListener('mouseover', function(){
  
//     let x = document.getElementById('divrow1');
//     x.style.visibility = 'visible';
// })

// document.getElementById('divrow1').addEventListener('mouseout', function(){
  
//     let x = document.getElementById('divrow1');
//     x.style.visibility = 'hidden';
// })


document.getElementById('dropdownMenuButton').addEventListener('mouseover',function()
{
  document.getElementById('dropdownMenuButton').click();                        
});



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


