const mongoose = require("mongoose");

const DB_URI = process.env.DATABASE;

mongoose.set("strictQuery", false);
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("not connected"));
