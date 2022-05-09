const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

//add exhibitions
router.post("/addexhibitions", verifyTokenAndAdmin, (req, res) => {
  const exhibition = {
    exhi_name: req.body.exhi_name,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    exhi_description: req.body.exhi_description,
    exhi_img: req.body.exhi_img,
    exhi_price: req.body.exhi_price,
    max_limit: req.body.max_limit,
  };

  const query = `INSERT INTO Exhibitions (exhi_name,from_date,to_date,exhi_description, exhi_img,exhi_price,max_limit) VALUES 
  ('${exhibition.exhi_name}', '${exhibition.from_date}', '${exhibition.to_date}', '${exhibition.exhi_description}','${exhibition.exhi_img}',${exhibition.exhi_price},${exhibition.exhi_price});`;
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

module.exports = router;
