const { verifyTokenAndAuthorization, verifyToken } = require("./verifytoken");

const router = require("express").Router();

router.post("/", verifyToken, (req, res) => {
  const cart = {
    userid: req.body.userid,
    art_id: req.body.art_id,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  //console.log(cart);
  //console.log(query);

  const query = `INSERT INTO cart(userid,art_id,quantity,total_price) VALUES(${
    cart.userid
  },'${cart.art_id}',${cart.quantity},${cart.price * cart.quantity})`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) res.sendStatus(500).json(err);
    else {
      console.log("Added to cart");
      return;
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
  console.log("yes");
  const query = `DELETE FROM cart WHERE userid = ${req.params.id} and art_id = '${req.body.art_id}';`;
  console.log(query);
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else console.log("Delete from cart...");
    return;
    // res.status(200).json("Deleted cart...");
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
