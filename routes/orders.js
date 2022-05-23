const { verifyTokenAndAuthorization } = require("./verifytoken");

const router = require("express").Router();

//customer orders
router.get("/myorders/:id", verifyTokenAndAuthorization, (req, res) => {
  const procedure = `call my_orders(${req.params.id})`;

  connection.query(procedure, (err, myOrders) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(myOrders[0]);
  });
});

module.exports = router;
