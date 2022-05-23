const { verifyTokenAndAuthorization } = require("./verifytoken");

const router = require("express").Router();

//customer orders
router.get("/mytickets/:id", verifyTokenAndAuthorization, (req, res) => {
  const procedure = `call my_tickets(${req.params.id})`;

  connection.query(procedure, (err, myTickets) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(myTickets[0]);
  });
});

module.exports = router;
