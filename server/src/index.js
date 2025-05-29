const express = require("express");
const  dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

app.get("/", (req, res) =>{
    res.send("landing page api is running ...");
});

const PORT  = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running  on port ${PORT}`)
);