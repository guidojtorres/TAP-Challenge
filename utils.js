const crypto = require('crypto');

const idGenerator = function () {
    return crypto.randomBytes(11).toString('hex').toUpperCase()
}



function generateDatabaseDateTime(date) {
    return date.toISOString().replace("T", " ").substring(0, 19);
}

module.exports = {
    idGenerator,
    generateDatabaseDateTime
}