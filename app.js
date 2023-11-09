const express = require("express");
const app = express();
//crear carpeta estatica:

app.use(express.static("public"));
app.use(express.json());

//crear conexion con mysql
const mysql = require("mysql2");

const connection = mysql.createConnection({
  // Creamos conexion a BBDD
  host: "localhost",
  user: "root",
  password: "volador25",
  database: "polo_digital",
});

// conectar con mysql

connection.connect((error) => {
  if (error) {
    return console.error(`error: ${error.message}`);
  }
  console.log("Conectado a MySQL!!");
});
//------------------------------------------------------------------Funciones utiles

//---------------------------------------------------------------------------------------FINAL DE LAS FUNCIONES UTILES;

//------------------------------------------------------------------Endpoints para el Index---------------------------------------------------

app.get("/carrusel", function (request, response) {
  connection.query("select * from eventos", function (error, result, fields) {
    let eventos = [];
    for (let i = 0; i < 3; i++) {
      eventos[i] = result[i];
    }
    // para filtrar en thunder por lo que quiero: http://localhost:8000/carrusel?total=3
    let total = request.query.total;
    response.send(eventos);
  });
});
//app.get
app.get(`/eventos/:ideventos`, function (request, response) {
  ideventos = request.params.ideventos;
  connection.query(
    `select * from eventos where id = ${ideventos}`,
    function (error, result, fields) {
      if (error) {
        return console.error(`error: ${error.message}`);
      }
      //la base de datos siempre te devuelve un array entoncecs queremos el elemento del array
      //como solo hay un elemento se pone el 0 que es la primera posicion.
      response.send(result[0]);
    }
  );
});

// TERMINA INDEX-------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------Endpoints para login y registro;
app.get("/login", function (request, response) {
  //Creamos una variable donde se va a hacer el request.query para poner menos cosas en el connection query
  const email = request.query.email;
  const password = request.query.password;
  //consulta con usuarios
  //select * usuarios donde el email es igual al que ponemos en request y contraseña igual
  //connection.query tiene una funcion dentro, si error mostrar mensaje y si ok realizar consulta.
  //Mysql necesita doble comillas para poner dentro una var.
  connection.query(
    `select * from usuarios where email = "${email}" and password = "${password}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
      //recorreme el array y si no hay ninguna coincidencia entre email y contraseña devuelve "email o contraseña mal"
      if (result.length == 0) {
        response.send({ message: "email o contraseña mal" });
        //si encuentra una coincidencia de ambos se loguea.
      } else {
        response.send({ message: "logueado" });
      }
    }
  );
});
//con los datos
//Hacer insert into clientes


//query strings
//params
//body
app.post("/registro", function (request, response) {
  let nombre = request.body.nombre;
  let apellidos = request.body.apellidos;
  let email = request.body.email;
  //con estos datos hay que guardarlos en my sql
  //Nombre y apellidos en empleados
  //email en usuario
  connection.query(
    `update usuariosclientes set usuario id = (select usuarios where id=130) where id=5`,
    function (error, result, fields) {
        if(error){
            response.status(400).send(`error ${error.message}`);
            return;
        }
    response.send({message:"registro completado"})  ; 
    });


});

//connection.query va con parentesus hasta el final de la consulta.
// TERMINA LOGIN Y REGISTRO----------------------------------------------------------------------------------

app.listen(8000, function () {
  console.log("server up and running");
});
