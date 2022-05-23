const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/user");

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const exhibitionRoute = require("./routes/exhibition");
const exhibitionCartRoute = require("./routes/exhibitionCart");
const customerRoute = require("./routes/customer");
const paymentRoute = require("./routes/payment");

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
app.use("/api/artworks", productRoute);
app.use("/api/exhibitions", exhibitionRoute);
app.use("/api/cart", cartRoute);
app.use("/api/exhibitioncart", exhibitionCartRoute);
app.use("/api/customer", customerRoute);
app.use("/api/payment", paymentRoute);

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
