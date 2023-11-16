const host = "http://localhost:8000";
window.addEventListener("load",clientes);


function clientes () {


fetch(`/clientes` 

).then( function(response) {
    return response.json()

}).then( function(json) {
    console.log(json);
//Coger elemento donde id=clientes
    const containerclientes = document.getElementById("clientes");
    containerclientes.innerHTML=`<ul>`;

    for(i=0 ; i<json.length ; i++) {
        containerclientes.innerHTML+=`<li>${json[i].razon_social}
        <button onclick=ModificarClientes(${json[i].id})>MODIFICAR DATOS</button></li>`;
    }

    containerclientes.innerHTML += `</ul>`;
 
    console.log(result);

}).catch( function(error) {
    return error;
})

}


function registrocliente () {

const razon_social = document.getElementById("razon_social").value;
const CIF = document.getElementById("CIF").value;
const sector = document.getElementById("sector").value;
const telefono = document.getElementById("telefono").value;
const numeroempleados = document.getElementById("numeroempleados").value;

if(!razon_social || !CIF || !sector || !telefono || !numeroempleados ) {
    alert("Registro mal introducido y no registrado");
} else {
fetch(`${host}/clientes` , {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({razon_social: razon_social,CIF: CIF,sector: sector,telefono: telefono, numeroempleados: numeroempleados})


}).then( function(response) {
    return response.json;

}).then( function(json) {
    console.log(json);
    alert("cliente registrado");

}).catch( function(error) {
    console.log(error);
});

}
}
function ModificarClientes(idclientes) {

  fetch(`${host}/clientes/${idclientes}`, {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
}).then( function(response) {
    return response.json();

}).then( function(json) {
    console.log(json);

    
})
}