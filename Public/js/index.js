const host = "http://localhost:8000";

//
window.addEventListener("load", function(event) {

    fetch(`${host}/carrusel?total=3`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            
            const containerUl =document.getElementById("carrusel");
            containerUl.innerHTML = "<ul>";

            for(i=0 ; i<json.length ;i++) {
                containerUl.innerHTML+=`<li>${json[i].nombre}${json[i].tipo}${json[i].fecha_inicio}${json[i].fecha_fin}
                <button onclick="carruselClick(${json[i].id})">Saber más</button> </li>`
            }

        containerUl+=`</ul>`;
        })
        .catch(function(error)   {   
        console.log(error);
        }) ;

      

//llamar al endpoint que te da todos los datos del evento y que al darle al botono saber mas me muestre solo ese evento:  
    fetch(`${host}/carrusel/:ideventos`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json)    {


        })




});