const host = "http://localhost:8000";
window.addEventListener("load",mobiliario);


//Mostrar mobiliario--------------------------------------------------------------------------------------------------------------------
function mobiliario() {

    fetch(`${host}/mobiliario`
    
    ).then(function (response) {
        return response.json()

    }).then (function (json) {
        console.log(json)

        const containerMob = document.getElementById("mobiliario");
        containerMob.innerHTML = `<ul>`;

        for(i=0 ; i<json.length ; i++) {
            containerMob.innerHTML += `<li>${json[i].nombre}<button onclick=modificarMobiliario(${json[i].id})>Modificar</button></li>`
        }
        containerMob.innerHTML +=`</ul>`;
        console.log(result);
        console.log(containerMob)

    }).catch ( function (error) {
        console.log(error);
    });

}
//Añadir nuevo mobiliario----------------------------------------------------------------------------------------------------------------
function agregarMobiliario () {

    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const referencia = document.getElementById("referencia").value;
    const estado = document.getElementById("estado").value;
    const salaid = document.getElementById("salaid").value;


    fetch(`${host}/mobiliario`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , tipo:tipo , referencia:referencia , estado:estado, salaid:salaid})
    
    }).then(function (response) {
        return response.json()

    }).then(function (json) {
        console.log(json)
     
        alert("Mobiliario registrado")

    }).catch(function (error) {
        console.log(error);
    })


}
function modificarMobiliario(idmobiliario) {
  
    fetch(`${host}/mobiliario/${idmobiliario}` 
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        document.getElementById("nombreModificar").value = json[0].nombre;
        document.getElementById("tipoModificar").value = json[0].tipo;
        document.getElementById("referenciaModificar").value = json[0].referencia;
        document.getElementById("estadoModificar").value = json[0].estado;

    }).catch(function(error) {
        console.log(error);
    })
}