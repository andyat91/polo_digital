const host = "http://localhost:8000";

window.addEventListener("load", MostrarClick);

function carruselClick(ideventos) {

  fetch(`${host}/eventos/${ideventos}`)

    .then(function (response) {
      return response.json();
    })

    .then(function (json) {

      const containerUl = document.getElementById("carrusel");

      const eventoHTML = `<h3>${json.nombre}</h3>
        <p>${json.tipo}</p> 
        <button onclick=MostrarClick()>VOLVER</button> `;

      containerUl.innerHTML = eventoHTML;
      console.log(eventoHTML);
    })

    .catch(function (error) {
      console.log(error);
    });
}

//Poner un boton volver a lo que ha salido y que vuelva atras.
//CALLBACK:primero me pinta el evento y luego la llamo de nuevo para que haga lo mismo en el boton volver.
function MostrarClick() {
  //En este caso el fetch me trae de mi endpoint 3 eventos.
  fetch(`${host}/carrusel?total=3`)
    .then(function (response) {
      return response.json();
    })

    .then(function (json) {
      //El json que devuelve trae un array donde aparecen 3 eventos
      //Coge el container donde está el id carrusel y pon en su lugar un <ul>listado</ul>
      const containerUl = document.getElementById("carrusel");
      containerUl.innerHTML = "<ul>";
      //Recorreme los tres eventos y ve metiendolo en una lista que vamos metiendo en nuestra variable containerUl
      for (i = 0; i < json.length; i++) {
        containerUl.innerHTML += `<li>${json[i].nombre} <img src="${json[i].images}"/>${json[i].fecha_inicio}${json[i].fecha_fin}
                <button onclick="carruselClick(${json[i].id})">Saber más</button> </li>`;
      }
      //Ahora pon un boton con una funcion onclick que va seleccionando el numero de id en cada evento que lee el for
      containerUl.innerHTML += `</ul>`;
      containerUl.innerHTML = innerHTML;
    })
    .catch(function (error) {
      console.log(error);
    });
}
