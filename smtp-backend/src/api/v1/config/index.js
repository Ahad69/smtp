const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../../../${process.env.NODE_ENV ?? ""}.env`
  ),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  dbConnection: () =>
    mongoose
      .connect(
        "mongodb+srv://dnilamweb:88pcomJY6IVU6VCq@cluster0.7xqktpb.mongodb.net/smtp?retryWrites=true&w=majority"
      )
      .then(console.log(`DB connection successfull`))
      .catch((error) => console.log(`Error to connect DB: ${error.message}`)),
};
// scobbd4
//3W2CdmRbuwdXGsHE
