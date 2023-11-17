const host = "http://localhost:8000";
window.addEventListener("load",inventario);

function inventario() {

    fetch(`${host}/inventario`
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)

        const containerInv = document.getElementById("inventario");
        containerInv.innerHTML =`<ul>`;

        for(i=0 ; i<json.length ; i++) {
            containerInv.innerHTML +=`<li>${json[i].nombre}<button onclick=modificarInventario(${json[i].id})>Modificar</button></li>`
        }
        containerInv.innerHTML += `</ul>`;
        console.log(result);
        console.log(containerInv);

    }).catch(function(error) {
        console.log(error)

    })

}

function agregarInventario() {

    const nombre = document.getElementById("nombre").value;
    const referencia = document.getElementById("referencia").value;
    const tipo = document.getElementById("tipo").value;
    const estado = document.getElementById("estado").value;
    const marca = document.getElementById("marca").value;
    const clienteid = document.getElementById("clienteid").value;

    fetch(`${host}/inventario`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , referencia:referencia, tipo:tipo , estado:estado , marca:marca})


    }).then(function(response) {
        response.json()

    }).then(function(json) {
        console.log(json)
        alert("mobiliario registrado");

    }).catch(function(error) {
        console.log(error)
    })

}