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
//app.get(`/eventos/:ideventos`, function (request, response) {
//  ideventos = request.params.ideventos;
//  connection.query(
//    `select * from eventos where id = ${ideventos}`,
//    function (error, result, fields) {
//      if (error) {
//        return console.error(`error: ${error.message}`);
//      }
//la base de datos siempre te devuelve un array entoncecs queremos el elemento del array
//como solo hay un elemento se pone el 0 que es la primera posicion.
//      response.send(result[0]);
//    }
//  );
//});

// TERMINA INDEX-------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------Endpoints para login y registro;
app.post("/login", function (request, response) {
  //Creamos una variable donde se va a hacer el request.query para poner menos cosas en el connection query
  const email = request.body.email;
  const password = request.body.password;
  console.log(email, password);
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

//query strings
//params
//body
app.post("/registro", function (request, response) {
  let nombre = request.body.nombre;
  let apellidos = request.body.apellidos;
  let email = request.body.email;
  let password = request.body.password;
  let DNI = request.body.DNI;
  let telefono = request.body.telefono;
  let clientesid = request.body.clientesid;
  //insert into usuarios.
  let aux = 0;
  //insert en usuarios el email y password;
  connection.query(
    `insert into usuarios (email,password) values ("${email}","${password}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
    }
  );
  //select para sacar el id del usuario nuevo
  connection.query(
    `select id from usuarios where email="${email}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
      aux = result[0].id;
      console.log(aux);
    }
  );
  connection.query(
    `select id from clientes where razon_social="${clientesid}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
        return;
      }
      let aux2 = result[0].id;

      connection.query(
        `insert into empleadosclientes (nombre,apellidos,usuarioid,clientesid,DNI,telefono) values ("${nombre}","${apellidos}","${aux}","${aux2}","${DNI}","${telefono}")`,
        function (error, result, fields) {
          if (error) {
            response.status(400).send(`error ${error.message}`);
            return;
          }
          response.send({ message: "Registrado" });
        }
      );
      console.log(result);
    }
  );
});

//connection.query va con parentesus hasta el final de la consulta.
// TERMINA LOGIN Y REGISTRO----------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------EndPoints CLIENTES

app.get("/clientes", function (request, response) {
  connection.query(
    `select * FROM clientes`, function (error, result, fields) {
    if (error) {
      response.status(400).send(`error ${error.message}`);
    }
    response.send(result);
  });

  
});
app.post("/clientes", function (request, response) {

  const razonsocial = request.body.razon_social;
  const CIF = request.body.CIF;
  const sector = request.body.sector;
  const telefono = request.body.telefono;
  const numeroempleados = request.body.numeroempleados;

  connection.query(
    `insert into clientes (razon_social,CIF,sector,telefono,numero_empleados) values ("${razonsocial}","${CIF}","${sector}","${telefono}","${numeroempleados}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
app.post("/clientes/:idcliente", function (request, response) {
  const idcliente = request.params.idcliente;
  const razonsocial = request.body.razon_social;
  const CIF = request.body.CIF;
  const sector = request.body.sector;
  const telefono = request.body.telefono;
  const numeroempleados = request.body.numeroempleados;

  connection.query(
    `update clientes set razon_social="${razonsocial}",CIF="${CIF}",sector="${sector}",telefono="${telefono}",numero_empleados="${numeroempleados}" where id ="${idcliente}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }

      response.send(result);
    }
  );
});

app.get("/clientes/:idcliente", function (request, response) {
  const idcliente = request.params.idcliente;
  connection.query(
    `select * from clientes where id="${idcliente}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//1º con app.get traemos todos los clientes con select*
//2º creamos un cliente nuevo desde el thunder y lo guardamos
//3º actualizamos cualquier dato en thunder y se actualiza en nuestra tabla,
//la clave del update es  poner todos los valores como un insert y que se cambie solo el que se quiere actualizar.
//---TERMINA CLIENTES-------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------Endpoints Mobiliario-------------

//1º para traer todos los elementos de mobiliario para enseñarlo en nuestra pagina mobiliario
app.get("/mobiliario", function (request, response) {
  connection.query(
    `select * from mobiliario`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//2º Para insertar un nuevo elemento de mobiliario a traves de app.post
app.post(`/mobiliario`, function (request, response) {
  //estas variables se guardan y luego se utilizan para rellenar base de datos
  const nombre = request.body.nombre;
  const tipo = request.body.tipo;
  const referencia = request.body.referencia;
  const estado = request.body.estado;
  const salaid = request.body.salaid;


  connection.query(
    `select id from salas where nombre="${salaid}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result); 
      let aux3 = result[0].id;
    

  connection.query(
    `insert into mobiliario (nombre,tipo,referencia,estado) VALUES ("${nombre}","${tipo}","${referencia}","${estado}","${aux3}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    });
  });
});
//3º Sirve para actualizar, es un post,
//pero se especifica el id con params entonces se ponen todos los campos pero se actualiza el que se precisa
app.post(`/mobiliario/:idmobiliario`, function (request, response) {
  const idmobiliario = request.params.idmobiliario;
  const nombre = request.body.nombre;
  const tipo = request.body.tipo;
  const referencia = request.body.referencia;
  const estado = request.body.estado;

  connection.query(
    `update mobiliario set nombre="${nombre}", tipo="${tipo}", referencia= "${referencia}", estado="${estado}" where id ="${idmobiliario}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//4º nos muestra en vez de todos, el elemento que pongamos por params.
app.get("/mobiliario/:idmobiliario", function (request, response) {
  const idmobiliario = request.params.idmobiliario;

  connection.query(
    `select * from mobiliario where id = "${idmobiliario}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});

//--TERMINA MOBILIARIO-----------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------Endpoints Eventos------------

//1ºMostrar todos los eventos
app.get("/eventos", function (request, response) {
  connection.query(`select * from eventos`, function (error, result, fields) {
    if (error) {
      response.status(400).send(`error ${error.message}`);
    }
    response.send(result);
  });
});
//2º crear un nuevo evento,se utiliza post
app.post("/eventos", function (request, response) {
  const nombre = request.body.nombre;
  const tipo = request.body.tipo;
  const fechainicio = request.body.fecha_inicio;
  const fechafin = request.body.fecha_fin;
  const aforo = request.body.aforo;

  connection.query(
    `insert into eventos (nombre,tipo,fecha_inicio,fecha_fin,aforo) VALUES ("${nombre}","${tipo}","${fechainicio}","${fechafin}","${aforo}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//3ºActualizar algun dato o todos de eventos, con post y un params para acceder directamente al evento deseado
app.post("/eventos/:ideventos", function (request, response) {
  const ideventos = request.params.ideventos;
  const nombre = request.body.nombre;
  const tipo = request.body.tipo;
  const fechainicio = request.body.fecha_inicio;
  const fechafin = request.body.fecha_fin;
  const aforo = request.body.aforo;

  connection.query(
    `update eventos set nombre="${nombre}", tipo="${tipo}", fecha_inicio="${fechainicio}", fecha_fin="${fechafin}", aforo="${aforo}" where id ="${ideventos}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//4º Seleccion de evento por params, para acceder a un evento especifico con GET.
app.get("/eventos/:ideventos", function (request, response) {
  const ideventos = request.params.ideventos;

  connection.query(
    `select * from eventos where id="${ideventos}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result[0]);
    }
  );
});

//------TERMINA EVENTOS--------------------------------------------------------------------------------------

//------------------------------------------------------------------Endpoint para inventario-----------------
//1º mostramos nuestro inventario
app.get("/inventario", function (request, response) {
  connection.query(
    `select * from inventario`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//2º introducir nuevos elementos al inventario con post
app.post("/inventario", function (request, response) {
  const nombre = request.body.nombre;
  const referencia = request.body.referencia;
  const tipo = request.body.tipo;
  const estado = request.body.estado;
  const marca = request.body.marca;

  connection.query(
    `insert into inventario (nombre,referencia,tipo,estado,marca) values ("${nombre}","${referencia}","${tipo}","${estado}","${marca}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//3º modificar alguno o todos los datos de un elemento con post y numero introducido por params
app.post("/inventario/:idinventario", function (request, response) {
  const idinventario = request.params.idinventario;
  const nombre = request.body.nombre;
  const referencia = request.body.referencia;
  const tipo = request.body.tipo;
  const estado = request.body.estado;
  const marca = request.body.marca;

  connection.query(
    `update inventario set nombre="${nombre}", referencia="${referencia}", tipo="${tipo}", estado="${estado}", marca="${marca}" where id="${idinventario}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});
//4ºseleccionar algun elemento con get y params
app.get("/inventario/:idinventario", function (request, response) {
  const idinventario = request.params.idinventario;

  connection.query(
    `select * from inventario where id="${idinventario}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error ${error.message}`);
      }
      response.send(result);
    }
  );
});

//--------------------------TERMINA INVENTARIO-------------------------------------------------------------------------
app.listen(8000, function () {
  console.log("server up and running");
});
