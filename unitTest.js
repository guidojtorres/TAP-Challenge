const { app } = require('./index')
const request = require('supertest');
const db = require('./db')
const port = 8000

describe('Iniciando servidor', function () {
    before(function (done) {
        db.connectToServer(
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit();
                }

                app.listen(port, () => {
                    console.log(`Servidor corriendo en el puerto: ${port} `);
                    done()
                })
            }
        )
    });

    describe('Probando GET game', () => {
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

        it('Deberia crear una nueva partida si no se provee identificador', function (done) {
            request(app)
                .get('/game')
                .set('Accept', 'application/json')
                .expect(204)
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