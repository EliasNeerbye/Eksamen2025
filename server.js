const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");

const app = express();

mongoose
    .connect(config.mongodbUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.listen(config.port, () => {
    console.log("Server is running on port 3000");
});
