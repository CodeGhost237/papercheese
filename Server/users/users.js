const mongoose = require("mongoose")

try {
    
    const userSchema = new mongoose.Schema({
        name : {String, required : true},
        Phone : {String, required : true},
        Password : {String, required : true}
    })

} catch (error) {
 
    console.error("un problème a été rencontré lors de l'inscription des utilisateurs", error)
}

module.exports = mongoose.model("users", userSchema)