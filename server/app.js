const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });  // just once we have to define and we can use the variable anywhere
require("./db/conn.js");

// middleware 
app.use(express.json()); // this line will convert json into object
app.use(require("./router/auth.js"));
// cookie parser

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("this is express");
})