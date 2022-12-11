
ListaUsuarios = [];



document.getElementById('btnregistrarUsuario').addEventListener('click',function(){
    
    let nuevoUsuario = document.getElementById('newUser').value;
    let nuevaContraseña = document.getElementById('newPass').value;

    let ArrayUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    
    if(ArrayUsuarios == null)
    {
        ArrayUsuarios = [];
    }
    else
    {

        let existe = false;
        let usuarioBD = ArrayUsuarios.find(function(e) {
                if(e.Usuario == nuevoUsuario)
                {
                    existe = true;
                }                
        });

        if(existe)
        {
            Swal.fire({
                icon:"error",
                title: "JS",
                text:"El usuario ya existe",
                
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  window.open('login.html');
                } 
              })
            
            return;
        }

        console.log('Continua...');
    }





    if(!validarEmail(nuevoUsuario))
    {
        Swal.fire({
            icon:"error",
            title: "JS",
            text:"Email Incorrecto",
        })
        return;
    }





    ArrayUsuarios.push(new UsuarioLogin(nuevoUsuario,nuevaContraseña));
    localStorage.setItem("usuarios", JSON.stringify(ArrayUsuarios));

    Swal.fire({
        icon:"success",
        title: "JS",
        text:"Usuario Registrado",
    })


    limpiar();


    return;
    
})

function limpiar(){

    const modal = bootstrap.Modal.getInstance(exampleModal);
    if(modal != null)
    {
        modal.hide();
    }    
    document.getElementById('newUser').value = "";
    document.getElementById('newPass').value = "";
    // document.getElementById('inputusuario').value = "";
    // document.getElementById('inputcontraseña').value = "";
};


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



document.getElementById('btnLogin').addEventListener('click',function(){
     let username = document.getElementById('inputusuario').value;
     let password = document.getElementById('inputcontraseña').value;

     let ArrayUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(ArrayUsuarios);

 
     let exist = (ArrayUsuarios ?? Swal.fire({
        icon:"info",
         title: "JS",
         text:"No hay usuarios registrados",
        //  background: "#d7ce8bcc"
     }));
            
     if(ArrayUsuarios !=null)
     {   
        console.log('Funcion')
        let existe = false;
        let usuarioBD = ArrayUsuarios.find(function(e) {
                if(e.Usuario == username && e.Password==password)
                {
                    existe = true;
                }                
        });
        
        if(!existe)
        {
            Swal.fire({
                icon:"error",
                title: "JS",
                text:"El usuario no existe, o las credenciales son incorrectas ",
            })
            limpiar();
        }
        else{
            window.location.href="index.html";
        }     
        
     }

     // let newUser = new UsuarioLogin(username.value,password.value);
 
 })
    

document.getElementById('bntolvidosuclave').addEventListener('click',function(){
    event.preventDefault();
    let username = document.getElementById('inputusuario').value;
    let password = document.getElementById('inputcontraseña').value;

    let ArrayUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(ArrayUsuarios);

    let userPass = ArrayUsuarios.find(e => {
        return e.Usuario == username;
    })


    if(userPass !=null)
    {
        Swal.fire({
            icon:"info",
            title: "JS",
            text:"Señor usuario su contraseña es: "+userPass.Password,
        })

    };

    

})
