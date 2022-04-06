//Coneccion a BBDD

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://guido:PZnKqfLQsoFP3vXl@cluster0.aj2rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConnection;


//Exportamos la funcion para conectarse a la BBDD 'TAP' con un callback (que en este caso inicia el servidor, declarado en index.js) y tambien una funcion para recuperarla.
module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
            dbConnection = db.db('TAP');
            console.log('Conectado a la bbdd')

            return callback()
        })
    },

    getDb: function () {
        return dbConnection;

    }
}
