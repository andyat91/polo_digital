const host = "http://localhost:8000";
window.addEventListener("load",clientes);

//Mostrar clientes en HTML actualizando datos------------------------------------------------------------------------------
function clientes () {


fetch(`${host}/clientes` 

).then( function(response) {
    return response.json()

}).then( function(json) {
    console.log(json);
//Coger elemento donde id=clientes
    const containerclientes = document.getElementById("clientes");
    containerclientes.innerHTML=`<ul>`;

    for(i=0 ; i<json.length ; i++) {
        containerclientes.innerHTML+=`<div class="card">
                                        <img src="${json[i].images} "/>
                                        <div>
                                            <div>
                                                <h3>${json[i].razon_social}</h3>
                                                <p>${json[i].descripcion} </p>
                                            </div>
                                            <div class="textobutton">
                                                <div>
                                                    <h5>sector: ${json[i].sector} </h5>
                                                    <h5>TELEFONO: ${json[i].telefono} </h5>
                                                </div>
                                                <div class="enlace">
                                                    <h5><a href="${json[i].url}" title="${json[i].url}"><i class="bi bi-link"></i></a></h5>
                                                    <button onclick="ModificarClientes(${json[i].id})">Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                      </div>`;
    }

    containerclientes.innerHTML += `</ul>`;
 
    console.log(result);

}).catch( function(error) {
    return error;
})

}
//1ºFuncion clientes = Fetch de clientes donde sale por un for clienes de SQL,
//2ºLe añado un boton modificar para que me lleve a ese elemento ejemplo editar Releevant





//Registrar cliente-------------------------------------------------------------------------------------------------------------
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
//1º Funcion registrar: un POST que va al id del html
//2º Conecta con api insert into clientes





//MOdificar clientes VIENE DEL BOTON QUE ESTA AL LADO DE CADA cliente---------------------------------------------
function ModificarClientes(idclientes) {
    
    fetch(`${host}/clientes/${idclientes}`
    
    
    ).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json);

        document.getElementById("razon_socialModificar").value =json[0].razon_social;
        document.getElementById("CIFModificar").value =json[0].CIF;
        document.getElementById("sectorModificar").value = json[0].sector;
        document.getElementById("telefonoModificar").value = json[0].telefono;
        document.getElementById("numeroempleadosModificar").value = json[0].numero_empleados;
        document.getElementById("id").value = json[0].id;
        desplazamiento ()
//guardamos el id en un input oculto.
    }).catch(function(error) {
        console.log(error);
    });

}

//1ºse guarda id de cliente y nos devuelve un array con los datos del cliente
//2ºAl HUECO que tiene el input le metemos lo que nos devuelve el json y ademas guardamos el id.




//Actualizar clientes, una vez modificados se guardan y POST-----------------------------------------------------------------------------------
function actualizarClientes() {

    const razon_social = document.getElementById("razon_socialModificar").value;
    const CIF = document.getElementById("CIFModificar").value;
    const sector = document.getElementById("sectorModificar").value;
    const telefono = document.getElementById("telefonoModificar").value;
    const numeroempleados = document.getElementById("numeroempleadosModificar").value;
    const idcliente = document.getElementById("id").value;

    fetch(`${host}/clientes/${idcliente}`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json", 
        },
        body: JSON.stringify({razon_social: razon_social,CIF: CIF,sector: sector,telefono: telefono, numeroempleados: numeroempleados, id:idcliente})

    }).then(function(response) {
        return response.json()

    }).then(function(json) {
        console.log(json)

    }).catch(function(error) {
        console.log(error)
    });
}

//-------------------------------------Funcion para desplazarse hasta modificar clientes--------------------------------------

function desplazamiento () {
    //seccion deseada por id
    let seccion = document.getElementById("formulariosclientes");
    //desplazamiento suave hasta la seccion deseada;
    seccion.scrollIntoView({behavior:"smooth"});
}
