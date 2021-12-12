calc = document.getElementById("calc");
a = document.getElementById("a");
b = document.getElementById("b");
c = document.getElementById("c");
d = document.getElementById("d");
e = document.getElementById("e");
f = document.getElementById("f");
g = document.getElementById("g");
h = document.getElementById("h");
i = document.getElementById("i");



calc.onclick = function () {
  if (a.value != "" && b.value != "") {
    b = (a.value/2); 
     
    

    b = parseFloat(mes.toFixed(2)); 
    resultado.innerHTML = b;
    console.log(b);

    

    dias = parseFloat(dias.toFixed(3));
    pd.innerHTML = dias;
    console.log(dias);
    
    

    if (b > 0 ) {
      b.innerHTML = `${b.value} `;
      
    
  } else {
    alert("Preenche todos os dados");
  }
}
};
