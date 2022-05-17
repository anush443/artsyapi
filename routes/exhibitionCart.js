const { verifyToken, verifyTokenAndAuthorization } = require("./verifytoken");

const router = require("express").Router();

router.post("/", verifyToken, (req, res) => {
  const data = req.body;

  const query = `INSERT INTO ExhibitionCart (userid,exhi_id,quantity,total_price) VALUES 
    (${data.userid},${data.exhi_id},${data.qty},${data.qty * data.price});`;
  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json("Added to cart");
  });
});

router.put("/update/:id", verifyTokenAndAuthorization, (req, res) => {
  const data = req.body;

  //console.log(req.body.qty);
  const query = `UPDATE ExhibitionCart set quantity = ${
    data.qty
  } ,total_price = ${data.qty * data.price} 
    where userid = ${req.params.id} and exhi_id = ${data.exhi_id};`;

  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json("Cart updated...");
  });
});

router.delete("/delete/:id", verifyTokenAndAuthorization, (req, res) => {
  const query = `Delete from ExhibitionCart where userid = ${req.params.id} and exhi_id = ${req.body.exhi_id};`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json("Deleted from exhibition cart....");
  });
});

module.exports = router;
