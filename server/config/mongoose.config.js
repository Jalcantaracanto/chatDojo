const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chatdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('The connection to the database was successful'))
    .catch((err) => console.log('Something went wrong with the connection to database', err))