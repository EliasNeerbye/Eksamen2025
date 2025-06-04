require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/userapi";

const CORS_ORIGINS = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:3000"];

if (!Array.isArray(CORS_ORIGINS)) {
    CORS_ORIGINS = [CORS_ORIGINS];
}

const config = {
    port: PORT,
    mongodbUri: MONGODB_URI,
    corsOrigins: CORS_ORIGINS,
};

module.exports = config;
