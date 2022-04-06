const { app } = require('./index')
const request = require('supertest');
const db = require('./db')
const port = 8000



//Iniciando servidor para las pruebas, y coneccion de BBDD
before(function (done) {
    db.connectToServer(
        (err) => {
            if (err) {
                console.error(err);
                process.exit();
            }

            app.listen(port, () => {
                console.log(`Servidor corriendo en el puerto: ${port} `);
            })
            return done()
        }
    )

});

//Pruebas
describe('Iniciando servidor', function () {
    //Probando los GET en /game
    describe('Probando GET game', () => {

        //Pegamos al endpoint con una request de GET que espera un codigo 200 de encontrado, utilizo el ID dado en el objeto ejemplo de la tarea.

        it('Deberia devolver JSON de una partida existente (Usando identificador proveido en el pdf)', function (done) {
            request(app)
                .get('/game/M67REZ8NPWJ7W7G94KVGOP')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body);
                    return done()
                })
        })

        //Ahora pegamos al endpoint sin parametos, en la ruta /game, para esperar una redireccion al objeto nuevo.

        it('Deberia crear una nueva partida y redirigir a ella si no se provee identificador', function (done) {
            request(app)
                .get('/game')
                .set('Accept', 'application/json')
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.status);
                    return done()
                })
        })
    })

    after('Terminando prueba, cerrando proceso', (done) => {
        setTimeout(process.exit(), 3000)
    })
})