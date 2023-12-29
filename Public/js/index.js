

window.addEventListener("load", eventoscarrusel());

function eventoscarrusel () {


  fetch(`http://localhost:8000/carrusel`
  
  ).then(function(response) {
    return response.json()


  }).then(function(json) {
    console.log(json)

    const containercarrusel = document.getElementById("contenedorcarrusel");

    for(let i=0 ; i<json.length ; i++) {
      containercarrusel.innerHTML += `<div class="itemcarrusel">
                                          <div class="tarjetas"><img src="${json[i].images}"/>
                                          </div>
                                          <div class="flechas">
                                              <h4>${json[i].nombre} </h4>
                                              <h5>Fecha del evento : ${json[i].fecha_inicio} </h5>
                                          </div>
                                      </div>`
    }


  }).catch(function(error) {
    console.log(error);

  })
};

function suscripcion() {

  const email = document.getElementById("emailnews").value; 

  fetch(`http://localhost:8000/suscripcion`, {
    method:"POST",
    headers: {
    "Content-Type":"application/json"
},
body: JSON.stringify({email:email})

  }).then(function(response) {
    return response.json()


  }).then(function(json) {

    if(json.message == "suscrito") {
      alert(json.message);
    }
  }).catch(function(error) {
    console.log(error)

  });
};