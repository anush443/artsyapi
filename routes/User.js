//const Connection = require("mysql/lib/Connection");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifytoken");

const router = require("express").Router();

//update
router.put("/:id", verifyTokenAndAuthorization, (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString();
  }

  const query = `UPDATE userlogin SET email = '${req.body.email}'where id=${req.params.id};`;

  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.send("Updated Succefully...");
  });
});

//delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const query = `DELETE FROM userlogin WHERE id =${req.params.id};`;
    await connection.query(query);
    res.status(200).json("User has been deleted.....");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user
router.get("/find/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM userlogin where id = ${req.params.id};`;
  connection.query(query, (err, user) => {
    if (user[0]) {
      //console.log(user);
      const { password, ...others } = user[0];
      res.status(200).json(others);
    } else res.status(500).json(err);
  });
});

// get all users
router.get("/", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM USERLOGIN;`;
  connection.query(query, (err, users) => {
    if (users) {
      res.status(200).json(users);
    } else res.status(500).json(err);
  });
});

router.get("/stats", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT COUNT(*) FROM USERLOGIN WHERE isAdmin = 0;`;
  connection.query(query, (err, count) => {
    if (count) {
      res.status(200).json(count[0]["COUNT(*)"]);
    } else res.status(500).json(err);
  });
});

module.exports = router;
