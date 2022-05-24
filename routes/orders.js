const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifytoken");

const router = require("express").Router();

//customer orders
router.get("/myorders/:id", verifyTokenAndAuthorization, (req, res) => {
  const procedure = `call my_orders(${req.params.id})`;

  connection.query(procedure, (err, myOrders) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(myOrders[0]);
  });
});

//all order
router.get("/allorders", verifyTokenAndAdmin, (req, res) => {
  const procedure = `Call all_orders()`;

  connection.query(procedure, (err, allOrders) => {
    if (err) res.status(500).json(err);
    else {
      //console.log(allOrders[0]);
      res.status(200).json(allOrders[0]);
    }
  });
});

//update delivery status
router.put("/updatedelivery/:orderid", verifyTokenAndAdmin, (req, res) => {
  const deliveryStatus = req.body.delivery_status;
  const query = `Update orders set delivery_status = ${deliveryStatus} where order_id = ${req.params.orderid}`;

  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(200).json({ message: 1 });
  });
});

// artworks sold
router.get("/artworkssold", verifyTokenAndAdmin, (req, res) => {
  const query = `Select count(*) from order_items;`;
  //console.log(query);
  connection.query(query, (err, artworkssold) => {
    if (err) res.status(500).json(err);
    else {
      //console.log(artworkssold[0]["count(*)"]);
      res.status(200).json(artworkssold[0]["count(*)"]);
    }
  });
});

module.exports = router;
