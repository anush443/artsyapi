const express = require("express");
const userRoute = require("./routes/User");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1602199600a",
  database: "artsy",
});
connection.connect((err) => {
  if (!err) console.log("DB connected");
  else console.log("Error");
});

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(5000, () => {
  console.log("Server running...");
});
