const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRound = 10

try {
    const UserSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true, 
        },
        phone: { 
            type: String,  
        },
        password: { 
            type: String, 
            required: true 
        },
    });

    // Middleware pour le hashage du mot de passe
    UserSchema.pre("save", async function (next) {
        try {
            if (!this.isModified("password")) return next();
    
            // Générer le hash et assigner
            const salt = await bcrypt.genSalt(saltRound);
            this.password = await bcrypt.hash(this.password, salt);
    
            next();
        } catch (err) {
            next(err);
        }
    });

    // Vérification de l'unicité avant la sauvegarde
    UserSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
                
            if (error.message.includes(('name').toLowerCase())) {
                console.log('Le nom d\'utilisateur est déjà pris.');
            } else if (error.message.includes('phone')) {
                console.log('Le numéro de téléphone est déjà utilisé.');
            } else {
                next(error);
            }
        } else {
            next(error);
        }
    });

    module.exports = mongoose.model("users", UserSchema)

} catch (error) {
    console.error("un problème a été rencontré lors de l'inscription des utilisateurs", error)
}
