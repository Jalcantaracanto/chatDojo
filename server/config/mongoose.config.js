const mongoose = require("mongoose")

mongoose
    .connect("mongodb://127.0.0.1/chatDojodb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Se establecio conexión con la base de datos correctamente"))
    .catch((err) => console.log("Algo salio mal con la conexión con la base de datos", err))
