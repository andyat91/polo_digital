let express = require("express");
let app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({ // Creamos conexion a BBDD
    host: 'localhost',
    user: 'root',
    password: 'maria0709',
    database: 'polo_digital',
});

connection.connect((error) => {
    if (error) {
        return console.error(`error: ${error.message}`);
    }
    console.log("Conectado a MySQL!!");
});

app.listen(8000, function () { // Seleccionamos el puerto 8000 para recibir consultas. Permite hacer el siguiente "get".
    console.log("Server is up and running!");
});

app.get("/clientes", function (request, response) { //Devolvemos en /clientes lo que pongamos en response.send() como parametro. (AUNQUE VAYA DENTRO DEL QUERY)

    connection.query("select * from clientes", (error, result, fields) => { // Hacemos el query a la BBDD. Recordamos que esta query nos devuelve result.
        if (error) { //Excepcion de error
            return console.error(`error: ${error.message}`)
        }
        response.send(result); // En este caso en vez de devollver "hola como estas", devolvemos "result", que es lo que devuelve el query a la BBDD.
    });
});


//Ejercicio otro: Devuelve una lista con todos los registros de la tabla empleados y empleados_clientes.

// app.get("/todos-empleados", (request, response) => {
//     let lista = [];
//     connection.query("select * from empleados", (error, result, fields) => {
//         for (let i = 0; i < result.length; i++) {
//             lista[i] = result[i];
//         }
//     });

//     connection.query("select * from empleadosclientes", (error, result, fields) => {
//         for (let i = 0; i < result.length; i++) {
//             lista[lista.length] = result[i];
//         }
//         response.send(lista);
//     });
// });

app.get("/todos-empleados", (request, response) => {
    connection.query("select * from empleados", (error, lista1, fields) => {
        connection.query("select * from empleadosclientes", (error, lista2, fields) => {
            response.send(lista1.concat(lista2));
        });
    });
});

app.get("/suma-clientes", (request, response) => {
    let totalempleados = 0;
    connection.query("select * from clientes", (error, result, fields) => {
        for (let i = 0; i < result.length; i++) {
            totalempleados += result[i].numeroempleados;
        }
        response.send({ totalempleados: totalempleados });
    });
});