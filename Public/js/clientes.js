const host = "http://localhost:8000";
window.addEventListener("load",clientes,registro);
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
        containerclientes.innerHTML+=`<li>${json[i].razon_social}</li>`;
    }

    containerclientes.innerHTML += `</ul>`;
 
    console.log(result);

}).catch( function(error) {
    return error;
})

}