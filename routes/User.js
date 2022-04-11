const router = require("express").Router();

router.get("/usertest", (req, res) => {
  //const username = req.body.username;
  res.send("Hello wd");
});

router.post("/userpost", (req, res) => {
  const data = {
    email: req.body.email,
    user_password: req.body.password,
    user_isAdmin: req.body.isAdmin,
  };

  //const data = req.body.name;
  console.log(data);
});

module.exports = router;

// app.post('/add',(req,res)=>
// {
//     var post={stuid:req.body.sid,stuname:req.body.sname,stuage:req.body.sage,gender:req.body.sgender,course:req.body.scourse,address:req.body.saddress,grade:req.body.sgrade};
//     var sql='INSERT INTO stuinfo SET ?';
//     var query=connection.query(sql,post,(err,result)=>
//     {
//         if (err) throw err;
//         res.send("Inserted Rows Succefully...");
//     })
