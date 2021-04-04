const mongoose = require("mongoose")
const Schema = mongoose.Schema
const taskSchema = new Schema({
    title: {
        type: String,
    },    
    tasks: {
        type: Array,
    },
    labels: {
        type: Array,
    },    
    type: {
        type: String
    },
    color: {
        type: String
    },
    status: {
        type: String
    },
    user_id: {
        type: String
    }
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Tasks", taskSchema)