const mongoose = require("mongoose")

try {
    mongoose.connect('mongodb://127.0.0.1/papercheese')
} catch (error) {
    console.error("Erreur de connexion à la BD. veuillez réessayer", error);
}
