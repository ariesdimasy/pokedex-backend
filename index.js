require("dotenv").config();

const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5500;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("connected to database");
});

app.use(express.json());
app.use(cors());

const mypokemonsRouter = require("./routes/mypokemons");
app.use("/mypokemons", mypokemonsRouter);

app.listen(port, () => {
  console.log("Application run on port : ", port);
});
