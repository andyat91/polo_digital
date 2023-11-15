//LOGIN despues de consolelog hacer un fetch para llamar al endpoint del login (el post)
const host = "http://localhost:8000";


function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email,password);
;
// Login
fetch(`${host}/login`, {
    method:"POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({email: email, password: password})
}).then(function(response) {
    return response.json()

}).then(function (json) {
    console.log(json);

    alert(json.message);
    if(json.message ===  "logueado") {
        window.location.href ="/index.html";
    }
}).catch(function (error) {
    console.log(error)

})

}