const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
require("./src/api/v1/config").dbConnection();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
    limit: "10mb",
  })
);

//asdf 


app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// app.use(csrfProtection);

readdirSync("./src/api/v1/routes").map((route) =>
  app.use(
    `/api/${route.split(".")[0]}`,
    require(`./src/api/v1/routes/${route}`)
  )
);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: "" });
});

app.get("/", (req, res) => {
  res.send("SMTP server started");
});

module.exports = app;
