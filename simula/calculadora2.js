efi = document.getElementById("efi");
calc = document.getElementById("calc");
bds = document.getElementById("bds");
ud = document.getElementById("ud");
um = document.getElementById("um");
resultado = document.getElementById("resultado");
ph = document.getElementById("ph");
pd = document.getElementById("pd");
cicle = document.getElementById("ct");


calc.onclick = function () {
  if (efi.value != "" && bds.value != "") {
    mes = ((efi.value) *(0.01)*(3.600)*(bds.value)*(ud.value)*(um.value)/ ct.value); 
    dias = ((efi.value) *(0.01)*(3.600)*(bds.value)*(ud.value)/ ct.value); 
    horas = (efi.value) *(0.01)*(3600) * (bds.value)/ ct.value; 
    

    mes = parseFloat(mes.toFixed(3)); 
    resultado.innerHTML = mes;
    console.log(mes);

    horas = parseInt(horas);
    ph.innerHTML = horas;
    console.log(horas);

    dias = parseFloat(dias.toFixed(3));
    pd.innerHTML = dias;
    console.log(dias);
    
    

    if (mes > 0 ) {
      horas.innerHTML = `${ph.value} `;
      dias.innerHTML = `${pd.value}`;
      mes.innerHTML = `${resultado.value}`;
    
  } else {
    alert("Preenche todos os dados");
  }
}
};
