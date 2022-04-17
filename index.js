const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

global.connection = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

// app.get("/api/users/user", (req, res) => {
//   connection.query("SELECT * FROM CustomerInformation", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });

app.listen(5000, () => {
  console.log("Server running...");
});
