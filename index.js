require("dotenv").config();

const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const app = express();

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
app.get("/", function (req, res) {
  res.send("my pokemon app");
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log("Listening on port %d", server_port);
});
