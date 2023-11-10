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
app.post("/login", function (request, response) {
  //Creamos una variable donde se va a hacer el request.query para poner menos cosas en el connection query
  const email = request.body.email;
  const password = request.body.password;
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
 // let email = request.body.email;
 // let password = request.body.password;
  let DNI = request.body.DNI;
  let telefono = request.body.telefono;
  let clientesid = request.body.clientesid;
//insert into usuarios.
let aux=0;
//insert en usuarios el email y password;
connection.query(
  `insert into usuarios (email,password) values ("${email}","${password}")`,
  function (error,result,fields) {
    if (error) {
      response.status(400).send(`error ${error.message}`);
      return;
      }

  });
//select para sacar el id del usuario nuevo
connection.query(
  `select id from usuarios where email="${email}"`,
  function(error,result,fields) {
    if (error) {
      response.status(400).send(`error ${error.message}`);
      return;
      }
      aux=result[0].id;
      console.log(result);//me devuelve mas de un id porque al grabar y mandarlo de nuevo me duplica el usuario.
 
connection.query(
  `insert into empleadosclientes (nombre,apellidos,usuarioid,clientesid,DNI,telefono) values ("${nombre}","${apellidos}","${aux}","${clientesid}","${DNI}","${telefono}")`,
  function(error,result,fields) {
    if (error) {
      response.status(400).send(`error ${error.message}`);
      return;
      }
      console.log(result)
  });

});

});

//connection.query va con parentesus hasta el final de la consulta.
// TERMINA LOGIN Y REGISTRO----------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------EndPoints CLIENTES

app.get("/clientes", function(request,response) {


  connection.query(
    `select * FROM clientes`,
    function(error,result,fields) {
      if (error)  {
        response.status(400).send(`error ${error.message}`);  
      }
      response.send(result);
    });

});
app.post("/clientes", function(request,response) {
  const razonsocial= request.body.razon_social;
  const CIF= request.body.CIF;
  const sector= request.body.sector;
  const telefono= request.body.telefono;
  const Nempleados= request.body.numero_empleados;

  connection.query(
    `insert into clientes (razon_social,CIF,sector,telefono,numero_empleados) values ("${razonsocial}","${CIF}","${sector}","${telefono}","${Nempleados}")`,
    function(error,result,fields) {
      if (error)  {
        response.status(400).send(`error ${error.message}`);  
      }
      response.send(result);
    });
});
app.post("/clientes/8", function(request,response) {
  const razonsocial= request.body.razon_social;
  const CIF= request.body.CIF;
  const sector= request.body.sector;
  const telefono= request.body.telefono;
  const Nempleados= request.body.numero_empleados;
  
  connection.query(

 `update clientes set razon_social="${razonsocial}",CIF="${CIF}",sector="${sector}",telefono="${telefono}",numero_empleados="${Nempleados}" where id =8`,
    function(error,result,fields) {
      if (error)  {
        response.status(400).send(`error ${error.message}`
        )};
      
      response.send(result);
    });
  });

app.get("/clientes/1", function(request,response) {

  connection.query(
    `select * from clientes where id=1`,
    function (error,result,fields) {
      if (error)  {
        response.status(400).send(`error ${error.message}`
        )};
      response.send(result);
    });

})
//1º con app.get traemos todos los clientes con select*
//2º creamos un cliente nuevo desde el thunder y lo guardamos
//3º actualizamos cualquier dato en thunder y se actualiza en nuestra tabla,
//la clave del update es  poner todos los valores como un insert y que se cambie solo el que se quiere actualizar.









//TERMINA CLIENTES
app.listen(8000, function () {
  console.log("server up and running");
});
