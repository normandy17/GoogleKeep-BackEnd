const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/users");
const taskRoute = require("./routes/tasks");
let port=process.env.PORT || 8001

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api", userRoute);
app.use("/api/tasks", taskRoute);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
