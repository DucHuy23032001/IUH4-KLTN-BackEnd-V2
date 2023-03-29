const MONGOOSE = require("mongoose");
const DOTENV = require("dotenv");

// check
DOTENV.config({
    path: "./config.env",
});

process.on("uncaughtException", (err) => {
    process.exit(1);
});

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE
const APP = require("./app");
MONGOOSE.set("strictQuery", false);
MONGOOSE.connect(
    DATABASE,
    () => {
        console.log("Success");
    },
    (e) => console.error(e)
);

APP.listen(PORT, () => {
    console.log(`Application is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    server.close(() => {
        process.exit(1);
    });
});
