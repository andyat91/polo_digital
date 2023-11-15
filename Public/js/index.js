const host = "http://localhost:8000";

//
window.addEventListener("load", MostrarClick);
//funcion que cuando le das al click de saber más te lleva al evento en concreto
//se realiza mediante una funcion de boton onclick;
function carruselClick(ideventos) {
  //Fetch nos conecta con nuestro endpoint de eventos.
  fetch(`${host}/eventos/${ideventos}`)
    //promesa nos convierte primero la informacion en json para su lectura
    .then(function (response) {
      return response.json();
    })
    //json nos devuelve informacion solicitada: en este caso es solo un elemento,esta relacionado por el id.
    //json es solo un evento en este caso
    .then(function (json) {
      //creamos una variable que nos encuentre un documento por su id.
      const containerUl = document.getElementById("carrusel");
      // le decimos que es lo que queremos meter en ese contenedor.
      //en este caso lo metemos en un h3 y queremos el nombre del evento devuelto por el fetch
      const eventoHTML = `<h3>${json.nombre}</h3>
        <p>${json.tipo}</p> 
        <button onclick=MostrarClick()>VOLVER</button> `;
      //ademas le hemos añadido un boton que vuelve a la informacion de antes,entonces creamos un callback que puede hacer dos veces la funcion necesaria
      //IMPORTANTE propiedad .innerHTML se utiliza para obtener o establecer el contenido de un html.
      //le digo: la ubicacion con propiedad(que establece contenido de html) = a lo que he puesto en mi variable eventoHTML
      containerUl.innerHTML = eventoHTML;
      console.log(eventoHTML);
    })
    //La promesa siempre tiene un catch para devolver error en la promesa.
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
        containerUl.innerHTML += `<li>${json[i].nombre}${json[i].tipo}${json[i].fecha_inicio}${json[i].fecha_fin}
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
