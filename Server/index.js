const express = require("express")
const cors = require("cors")

require('dotenv').config();

const app = express()

app.use(express.json())
app.use(cors())
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);


require("./Connection/connection")
const User = require("./models/users")

app.post('/', async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        res.status(201).send(result); // Succès : utilisateur créé
    } catch (error) {
        if (error.code == 11000) {
            // Gérer les erreurs d'unicité
            if (error.keyPattern.name) {
                return res.status(400).json({ error: "Le nom d'utilisateur est déjà pris." });
            }
            if (error.keyPattern.phone) {
                return res.status(400).json({ error: "Le numéro de téléphone est déjà utilisé." });
            }
        }
        // Autres erreurs
        res.status(500).json({ error: "Une erreur interne s'est produite. Veuillez réessayer." });
    }
});

const port = 5000



app.listen(port, () => {
    console.log(`Le serveur est demarré au port ${port}`);
});
