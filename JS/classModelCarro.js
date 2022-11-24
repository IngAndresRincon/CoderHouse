class Carro{

    constructor(conductor,placa,correo){
        this.nombre = conductor;
        this.placa = placa;        
        this.correo = correo;
    }
    
    mostrarInformacion()
    {
        console.log("Nombre del conductor: "+nombre);
    }


    funComprarSeguro()
    {
        let newFecha = new Date();
        let modelo = parseInt(prompt('Ingrese el módelo del vehículo: '))
        if(modelo > parseInt(newFecha.getFullYear))
            console.log('El módelo del vehículo no puede ser mayor al año actual');

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
            alert("Seguro Comprado "+newFecha.getDate()+"-"+(parseInt(newFecha.getMonth())+1)+"-"+newFecha.getFullYear()+"!\n Sr(a) "+this.nombre+"\n"+"El vehículo de placa: "+this.placa+ " módelo: "+modelo+" compró un seguro por valor de: "+valorSeguro/valorDolar+" dolares");
        }
        else
        {
            alert("Compra cancelada")
        }
     
    }
    

    
    funCotizarSeguro()
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



}