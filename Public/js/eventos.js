const host = "http://localhost:8000";
window.addEventListener("load",eventos,modificarEventos);

function eventos() {

    fetch(`${host}/eventos`
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)

        const containerEv = document.getElementById("eventos");
        

        for(i=0 ; i<json.length ; i++) {
            containerEv.innerHTML += `<li><p>${json[i].nombre} </p><button onclick=modificarEventos(${json[i].id})>Modificar</button></li>`
        } 
       

    }).catch(function(error) {
        console.log(error)
    })
};

function crearEventos() {

    const nombre = document.getElementById("nombre").value;
    const fechainicio = document.getElementById("fechainicio").value; 
    const fechafin = document.getElementById("fechafin").value;
    const aforo = document.getElementById("aforo").value;
    const clientesid = document.getElementById("clientesid").value;
    const salaid = document.getElementById("salaid").value;

    fetch(`${host}/eventos`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre  , fecha_inicio:fechainicio , fecha_fin:fechafin , aforo:aforo , clientesid:clientesid , salaid:salaid})
    
    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)
        

        alert("Evento creado")
    }).catch(function(error) {
        console.log(error)

    })
};
//Modificar eventos------------------------------------------------------------------------------------------------------------------------------------------------
//tiene mismo url que 
function modificarEventos(ideventos) {

    fetch(`${host}/eventos/${ideventos}`
    

    ).then(function(response) {
        return response.json()


    }).then(function(json) {
        console.log(json);
// En este caso me devuelve un elemento y no un array entonces no hay que poner ([0])
        document.getElementById("nombreModificar").value = json[0].nombre;
        document.getElementById("fechainicioModificar").value = json[0].fecha_inicio;
        document.getElementById("fechafinModificar").value = json[0].fecha_fin;
        document.getElementById("aforoModificar").value = json[0].aforo;
        document.getElementById("clientesidModificar").value = json[0].clientesid;
        document.getElementById("salaidModificar").value = json[0].salaid;
        document.getElementById("id").value = json[0].id;

    }).catch(function(error) {
        console.log(error)
    })

};
// DUDAS:
//1º Fechas undefined.
//2º añadir clienteid y salaid cuando ponen el nombre de una sala o cliente.
//3º Cuando le doy a modificar evento me da undefinded too.


function actualizarEvento() {

    const nombre = document.getElementById("nombreModificar").value;
    const fechainicio = document.getElementById("fechainicioModificar").value; 
    const fechafin = document.getElementById("fechafinModificar").value;
    const aforo = document.getElementById("aforoModificar").value;
    const clientesid = document.getElementById("clientesidModificar").value;
    const salaid = document.getElementById("salaidModificar").value;
    const id = document.getElementById("id").value;


    fetch(`${host}/eventos/${id}`, {
        method:"POST",
        headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , fechainicio:fechainicio , fechafin:fechafin , aforo:aforo , clientesid:clientesid , salaid:salaid})


    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)

    
    }).catch(function(error) {
        console.log(error)
    })
};