//clientes
fetch(`${host}/clientes/${idclientes}`, {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({razon_social: razon_social,CIF: CIF,sector: sector,telefono: telefono, numeroempleados: numeroempleados})
}).then( function(response) {
    return response.json();

}).then( function(json) {
    console.log(json);
    
    document.getElementById("razon_social").value = json[idclientes].razon_social;
    document.getElementById("CIF").value = json[idclientes].CIF;
    document.getElementById("sector").value = json[idclientes].sector;
    document.getElementById("telefono").value = json[idclientes].telefono;
    document.getElementById("numeroempleados").value = json[idclientes].numero_empleados;
  
    
}).catch( function(error) {
    console.log(error);
});

