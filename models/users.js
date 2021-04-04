const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
    },    
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Users", userSchema)