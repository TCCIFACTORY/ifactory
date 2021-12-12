efi = document.getElementById("efi");
calc = document.getElementById("calc");
bds = document.getElementById("bds");
ud = document.getElementById("ud");
um = document.getElementById("um");
plm = document.getElementById("plm");
resultado = document.getElementById("resultado");
ph = document.getElementById("ph");
pd = document.getElementById("pd");


calc.onclick = function () {
  if (efi.value != "" && bds.value != "") {
    imcx = ((efi.value *( 0.01 * 3600 )* (bds.value) * (ud.value) * (um.value) ) / plm.value);
    dias = ( plm.value/um.value);
    horas = Math.round(dias/ud.value);
    

    imcx = parseFloat(imcx).toFixed(2);
    resultado.innerHTML = imcx;
    console.log(imcx);

    ph.innerHTML = horas;
    horas = horas.toFixed(1);
    console.log(horas);

    pd.innerHTML = dias;
    dias = dias.toFixed(2);
    console.log(dias);
    
    

    if (imcx > 0 ) {
      imcx.innerHTML = `${resultado.value}, Segundos `;
      horas.innerHTML = `${ph.value} `;
      dias.innerHTML = `${pd.value}`;
    
  } else {
    alert("Preenche todos os dados");
  }
}
};
