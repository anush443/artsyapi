const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

//add exhibitions
router.post("/addexhibitions", verifyTokenAndAdmin, (req, res) => {
  const exhibition = {
    exhi_name: req.body.ename,
    from_date: req.body.estartdate,
    to_date: req.body.eenddate,
    exhi_description: req.body.edescription,
    exhi_img: req.body.eimagepath,
    exhi_price: req.body.eprice,
    max_limit: req.body.elimit,
  };

  const query = `INSERT INTO Exhibitions (exhi_name,from_date,to_date,exhi_description, exhi_img,exhi_price,max_limit) VALUES 
  ('${exhibition.exhi_name}', '${exhibition.from_date}', '${exhibition.to_date}', '${exhibition.exhi_description}','${exhibition.exhi_img}',${exhibition.exhi_price},${exhibition.exhi_price});`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json("New Exhibition added...");
  });
});

//get exhibitions
router.get("/allexhibitions", (req, res) => {
  const query = `SELECT * FROM Exhibitions`;
  //console.log(query);
  connection.query(query, (err, exhibitions) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      //console.log(exhibitions);
      return res.status(200).json(exhibitions);
    }
  });
});

//get exhibition
router.get("/exhibition/:id", (req, res) => {
  const query = `SELECT * FROM Exhibitions where exhi_id = ${req.params.id};`;
  //console.log(query);
  connection.query(query, (err, exhibition) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      //console.log(exhibition);
      return res.status(200).json(exhibition);
    }
  });
});

//update exhibition
router.put("/update/:id", (req, res) => {
  const query = `Update Exhibitions set exhi_name = '${req.body.exhi_name}',exhi_price = ${req.body.exhi_price},exhi_description = '${req.body.exhi_description}' where exhi_id = ${req.params.id};`;
  //console.log(query);

  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json({ message: 1 });
  });
});

module.exports = router;
