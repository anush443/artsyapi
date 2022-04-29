const { verifyTokenAndAuthorization, verifyToken } = require("./verifytoken");

const router = require("express").Router();

router.post("/", verifyToken, (req, res) => {
  const cart = {
    userid: req.user.id,
    art_id: req.body.art_id,
    quantity: req.body.quantity,
  };
  let price = 0;
  let query = `SELECT PRICE FROM ArtworkInformation WHERE id ='${cart.art_id}'`;
  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err);
    else {
      price = result[0].PRICE;
      query = `INSERT INTO CART(userid,art_id,quantity,total_price) VALUES(${
        cart.userid
      },'${cart.art_id}',${cart.quantity},${price * cart.quantity})`;
      connection.query(query, (err, result) => {
        if (err) res.status(500).json(err);
        else res.status(200).json("Added to cart");
      });
    }
  });
});

//update cart with userid
router.put("/update/:id", verifyTokenAndAuthorization, (req, res) => {
  let price = 0;
  let query = `SELECT PRICE FROM ArtworkInformation WHERE id ='${req.body.art_id}'`;
  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err);
    else {
      price = result[0].PRICE;
      //console.log(price);
      query = `UPDATE cart set quantity = ${req.body.quantity},total_price = ${
        req.body.quantity * price
      } where art_id = '${req.body.art_id}' and userid = ${req.params.id} `;
      //console.log(query);
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else res.status(200).json("Cart updated");
      });
    }
  });
});

//delete cart
router.delete("/delete/:id", verifyTokenAndAuthorization, (req, res) => {
  const query = `DELETE FROM CART WHERE userid = ${req.params.id}`;
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(200).json("Deleted cart...");
  });
});

//get user cart

router.get("/:id", verifyTokenAndAuthorization, (req, res) => {
  const query = `SELECT * FROM CART WHERE userid = ${req.params.id};`;
  connection.query(query, (err, cart) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(cart);
  });
});

module.exports = router;
