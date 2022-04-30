const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", (req, res) => {
  const user = {
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString(),
  };

  //checking if user already exists
  let query = `SELECT email FROM userlogin where email ='${user.email}';`;
  connection.query(query, (err, result) => {
    if (err) return res.json({ error: err });
    else if (result[0]) {
      return res.json({ message: "User Already Registered. Please Login." });
    }

    //creating new user
    query = `INSERT INTO Userlogin(email,password) VALUES('${user.email}','${user.password}');`;
    //console.log(query);
    connection.query(query, (err) => {
      if (err) return res.json({ error: err });
      return res.json({ message: "Successfully Registered new user" });
    });
  });
});

//login
router.post("/login", (req, res) => {
  const query = `SELECT  id,email,password,isAdmin FROM Userlogin where email = '${req.body.email}';`;

  connection.query(query, (err, user) => {
    if (err) return console.log(err);
    else if (!user[0]) return res.json({ message: "please register first" });

    //decrypting org pass
    const orginalPass = CryptoJS.AES.decrypt(
      user[0].password,
      process.env.CRYPTO_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (orginalPass != req.body.password)
      return res.json({ message: "Incorrect Password" });
    else {
      const accessToken = jwt.sign(
        {
          id: user[0].id,
          isAdmin: user[0].isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user[0];

      return res.status(200).json({ ...others, accessToken, expiresIn: "3d" });
    }
  });
});

module.exports = router;
