const express=require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const mediaInfo=require("./data/mediaInfo")
const Media = require("./models/media")
const cors = require("cors")
const mediaRoute=require("./routes/media")
const connectDB=require("./config/db")

dotenv.config();
const app = express()
connectDB()
app.use(express.json())
app.use(cors())
app.use("/api/media", mediaRoute)
console.log(Media[0])

const importData = async () => {
    try {
        await Media.deleteMany()
        const createdMedia=await Media.insertMany(mediaInfo)
        console.log("Data Import Successfull")
        process.exit()
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Media.deleteMany()
        console.log("Data Deletion Successfull")
        process.exit()
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

if(process.argv[2]==="-d"){
    destroyData()
}
else importData()

app.listen(8001, () => {
    console.log("The server is running on port 5000")
})