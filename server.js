const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
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

app.use(helmet());

const corsOptions = {
    origin: config.corsOrigins,
    methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Ressurs ikke funnet.",
        data: null,
    });
});

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    return res.status(500).json({
        success: false,
        message: "Intern serverfeil.",
        data: null,
    });
});

app.listen(config.port, () => {
    console.log("Server is running on port 3000");
});
