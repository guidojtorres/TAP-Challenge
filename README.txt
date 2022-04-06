TAP challenge de Guido Torres.

Arquitectura usada: Node.js como servidor, Express.js como middleware, MongoDB Atlas como base de datos de prueba, Mocha y supertest para las pruebas.


Para inicializar el servidor, correr el comando node start, el servidor va a estar abierto en el puesto 3000, acepta requests GET en /game y /game/{ID}, devuelve el json de la partida creada si no se especifica parametro ID,
caso contrario, devuelve json de la partida con dicho ID (si no existe, devolvera error).

Para ejecutar los tests, uso mocha y supertest. En este caso, queremos ejecutar el comando: npm test unitTest. Esto probara los dos endpoints creados.

En los archivos funcionales esta comentada la funcionalidad del codigo.