

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
}