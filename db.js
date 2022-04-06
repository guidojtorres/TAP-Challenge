const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://guido:PZnKqfLQsoFP3vXl@cluster0.aj2rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConnection;

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
