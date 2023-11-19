const host = "http://localhost:8000";
window.addEventListener("load",inventario,modificarInventario);

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
    body: JSON.stringify({nombre:nombre , referencia:referencia, tipo:tipo , estado:estado , marca:marca, clienteid:clienteid})


    }).then(function(response) {
        response.json()

    }).then(function(json) {
        console.log(json)
        alert("mobiliario registrado");

    }).catch(function(error) {
        return error;
    })

};

function modificarInventario(idinventario) {

    fetch(`${host}/inventario/${idinventario}` 
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)

        document.getElementById("nombreModificar").value = json[0].nombre;
        document.getElementById("tipoModificar").value = json[0].tipo;
        document.getElementById("referenciaModificar").value = json[0].referencia;
        document.getElementById("estadoModificar").value = json[0].estado;
        document.getElementById("marcaModificar").value = json[0].marca;
        document.getElementById("clienteidModificar").value = json[0].clienteid;
        document.getElementById("id").value = json[0].id;

    }).catch(function(error) {
        console.log(error)
    });
};

function actualizarInventario() {

    const nombre = document.getElementById("nombreModificar").value;
    const tipo = document.getElementById("tipoModificar").value;
    const referencia = document.getElementById("referenciaModificar").value;
    const estado = document.getElementById("estadoModificar").value;
    const marca = document.getElementById("marcaModificar").value;
    const clienteid = document.getElementById("clienteidModificar").value;
    const id = document.getElementById("id").value;


    fetch(`${host}/inventario/${id}`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , tipo:tipo , referencia:referencia , estado:estado, clienteid:clienteid , marca:marca , id:id})

    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)
        alert("Inventario modificado")
    }).catch(function(error) {
        console.log(error)
    });
}
