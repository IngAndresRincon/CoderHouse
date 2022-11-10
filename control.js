
document.getElementById('view1').addEventListener('mouseover', function(){
  
     let x = document.getElementById('divrow1');
     x.style.visibility = 'visible';
})

document.getElementById('divrow1').addEventListener('mouseover', function(){
  
    let x = document.getElementById('divrow1');
    x.style.visibility = 'visible';
})

document.getElementById('divrow1').addEventListener('mouseout', function(){
  
    let x = document.getElementById('divrow1');
    x.style.visibility = 'hidden';
})

