const express = require("express");
const app = express();
//crear carpeta estatica:

//
app.use(express.static("public"));


//creame un elemento del api que me diga hola
app.get("/carrusel", function(request,response)  {
    response.send({message: "hola"});
});

app.listen (8000, function() {
    console.log("server up and running");
});