const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connection Established: " + connect.connection.host)
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

module.exports=connectDB

