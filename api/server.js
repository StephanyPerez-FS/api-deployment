const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const carRouter = require("./routes/cars");
const authRouter = require("./routes/auth");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

app.use(express.json());
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/auth", authRouter);

app.use(express.static(path.join(__dirname, "../reactjs/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
