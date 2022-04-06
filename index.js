//Imports

const express = require('express')
const port = 3000
const dbo = require('./db')
const utils = require('./utils')
const app = express()



//Declaracion de la ruta GET en /game, funcionalidad de creacion de entrada y redireccion.
app.get('/game', async (req, res) => {
    const dbConnect = dbo.getDb();
    const uuid = utils.idGenerator()
    const d = new Date();
    const fecha = utils.generateDatabaseDateTime(d)

    const newGame = {
        game: {
            id: uuid,
            created: fecha,
            state: {
                code: '1',
                description: 'CREATED'
            }
        },
        cells: []
    }

    dbConnect
        .collection('games')
        .insertOne(newGame, function (err, result) {
            if (err) {
                res.status(400).send('Error creando el juego')
            } else {
                res.status(204).redirect(`/game/${newGame.game.id}`)
            }
        })

})

//Declaracion GET de /game/{ID} y funcionalidad.
app.get('/game/:id', async (req, res) => {
    const dbConnect = dbo.getDb();
    var collection = dbConnect.collection('games')
    var result = await collection
        .find({ "game.id": req.params.id })
        .toArray()

    if (result.length > 0) {
        res.status(200).json(result)
    } else {
        res.status(400).send('Error')
    }
})


//Funcion para empezar el servidor en el puerto deseado y conectarse a la base de datos.
function startServer() {
    dbo.connectToServer(
        (err) => {
            if (err) {
                console.error(err);
                process.exit();
            }

            app.listen(port, () => {
                console.log(`Servidor corriendo en el puerto: ${port} `);
            })
        }
    )
}

module.exports = { app, startServer }