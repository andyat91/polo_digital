const host = "http://localhost:8000";

function registro() {

    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;
    let repiteemail = document.getElementById("repiteemail").value;
    let password = document.getElementById("password").value;
    let repitepassword = document.getElementById("repitepassword").value;
    let DNI = document.getElementById("DNI").value;
    let telefono = document.getElementById("telefono").value;
    let clientesid = document.getElementById("clientesid").value;

    if(email!=repiteemail) {
        alert("email mal puesto, repite email");
    
    } else if (password!=repitepassword) {
        alert("password mal puesta");
    } else if (email!=repiteemail && password!=repitepassword) {
        alert("email y password mal puestas")
    } else {

fetch(`${host}/registro`,  {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({nombre:nombre , apellidos:apellidos , email:email, password:password , DNI:DNI , telefono:telefono , clientesid:clientesid})
}).then(function (response) {
    return response.json()
    
}).then(function (json) {
    alert("Registrado correctamente")
    console.log(json)
}).catch(function (error) {
    return error;
})
}
}