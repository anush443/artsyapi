const { verifyToken, verifyTokenAndAuthorization } = require("./verifytoken");

const router = require("express").Router();

const generateOrderItems = (userId, orderId, res) => {
  const procedure = `call Artsy_Artwork_OrdersItems_method(${userId},${orderId},@count_cart);`;
  connection.query(procedure, (err) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return;
    }
  });
};

const onlyArtworksOrders = (userId, res) => {
  const procedure = `call Artsy_Artwork_Orders_method(${userId},@aorder_id);`;
  connection.query(procedure, (err, result) => {
    if (err) return res.status(500).json(err);
    else {
      let orderId = result[0][0].aorder_id;
      generateOrderItems(userId, orderId, res);
    }
  });
};

const onlyTickets = (userId, res) => {
  const procedure = `call Artsy_Ticket_Booked_method(${userId},@count_ecart)`;
  connection.query(procedure, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: 1 });
  });
};

router.post("/:id", verifyTokenAndAuthorization, (req, res) => {
  const data = req.body;
  console.log(data);

  const query = `INSERT INTO Payment (userid,amount,payment_time) VALUES (${req.params.id},${data.amount},CURRENT_TIMESTAMP());`;
  connection.query(query, (err) => {
    if (err) return;
    else {
      if (data.paymentType === 0) {
        //only artworks payment
        onlyArtworksOrders(req.params.id, res);
        return res.status(200).json({ message: 1 });
      } else if (data.paymentType === 1) {
        // tickets payment
        console.log("tickets");
        onlyTickets(req.params.id, res);
      } else if (data.paymentType === 2) {
        onlyArtworksOrders(req.params.id, res);
        onlyTickets(req.params.id, res);
      }
    }
  });
});

module.exports = router;
