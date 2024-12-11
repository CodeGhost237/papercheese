const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1/papercheese', {
}).then(() => {
    console.log("Connexion à MongoDB réussie !");
}).catch(error => {
    console.error("Erreur de connexion à la BD. Veuillez réessayer :", error.message);
});
