const MONGOOSE = require("mongoose");
const DOTENV = require("dotenv");
const APP = require("./app");
const PORT = process.env.PORT;

// check
DOTENV.config({
    path: "./config.env",
});

MONGOOSE.connect(
    "mongodb+srv://nguyenduchuy_19437351:19437351@cluster0.by7zigb.mongodb.net/test",
    () => {
        console.log("Success");
    },
    (e) => console.error(e)
);

APP.listen(3000, () => {
  console.log(`Application is running on PORT 3000`);
});