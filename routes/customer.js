const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifytoken");

const router = require("express").Router();

//add to customer info
router.post("/", verifyToken, (req, res) => {
  const customerInfo = {
    userId: req.body.id,
    name: req.body.fullName,
    email: req.body.email,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    zipcode: req.body.zipcode,
    mobile: +req.body.mobile,
  };
  console.log(customerInfo);
  const query = `INSERT INTO Customer_information (userId,name,email,mobile,address,state,city,zipcode) values(?,?,?,?,?,?,?,?);`;
  console.log(query);
  connection.query(
    query,
    [
      customerInfo.userId,
      customerInfo.name,
      customerInfo.email,
      customerInfo.mobile,
      customerInfo.state,
      customerInfo.city,
      customerInfo.address,
      customerInfo.zipcode,
    ],
    (err) => {
      if (err) res.status(500).json(err);
      else return res.status(200).json({ message: 1 });
    }
  );
});

//get customer info
router.get("/:id", (req, res) => {
  const query = `Select * from Customer_information where userId = ${req.params.id}`;

  connection.query(query, (err, info) => {
    if (err) res.status(500).json;
    else return res.status(200).json(info);
  });
});

//update customer info
router.put("/update/:id", verifyTokenAndAuthorization, (req, res) => {
  const update = req.body;

  const query = `Update Customer_information set name = '${update.fullName}', email = '${update.email}', mobile = ${update.mobile},
  address = '${update.address}',state = '${update.state}',city = '${update.city}',zipcode = ${update.zipcode} where userId = ${req.params.id}`;

  //console.log(query);
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else return res.status(200).json({ message: 1 });
  });
});

//delete customer info
router.delete("/delete/:id", verifyTokenAndAuthorization, (req, res) => {
  const query = `DELETE FROM  Customer_information where userId = ${req.params.id};`;

  connection.query(query, (err) => {
    if (err) res.status(500).json;
    else return res.status(200).json({ message: 1 });
  });
});

//get all customers info

router.get("/allcustomers/info", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM Customer_information;`;
  console.log(query);
  connection.query(query, (err, allCustomers) => {
    if (err) res.status(500).json;
    else return res.status(200).json(allCustomers);
  });
});

module.exports = router;
