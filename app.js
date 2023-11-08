const express = require("express");
const app = express();
//crear carpeta estatica:

app.use(express.static("public"));




//crear conexion con mysql
const mysql = require("mysql2");

const connection = mysql.createConnection({ // Creamos conexion a BBDD
    host: 'localhost',
    user: 'root',
    password: 'volador25',
    database: 'polo_digital',
});


// conectar con mysql

connection.connect((error) => {
    if (error) {
        return console.error(`error: ${error.message}`);
    }
    console.log("Conectado a MySQL!!");
});

app.get("/carrusel", function(request,response)  {
   
   connection.query("select * from eventos", function(error,result,fields) {
    let eventos=[];
    for(let i=0; i<3 ; i++) {
      eventos[i] = result[i];
      
    }
    response.send(eventos);

   });
   

});
app.get("/login", function(request,response) {
    const email = request.query.email;
    const password = request.query.password;
 //consulta con usuarios
 //select * usuarios donde el email es igual al que ponemos en request y contraseña igual   
 //connection.query tiene una funcion dentro, si error mostrar mensaje y si ok realizar consulta.
    connection.query(`select * from usuarios where email = "${email}" and password = "${password}"`, function(error,result,fields) {
        if (error) {
            response.status(400).send(`error ${error.message}`);
        return;
    } 
//recorreme el array y si no hay ninguna coincidencia entre email y contraseña devuelve "email o contraseña mal"
    if (result.length == 0) {
        response.send({message: "email o contraseña mal"});
//si encuentra una coincidencia de ambos se loguea.   
    } else {
        response.send({message: "logueado"});
    }
    })
//connection.query va con parentesus hasta el final de la consulta.







})

app.listen (8000, function() {
    console.log("server up and running");
});