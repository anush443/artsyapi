const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

router.post("/addartwork", verifyTokenAndAdmin, (req, res) => {
  const newArtwork = {
    artist_id: req.body.artist_id,
    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
    description: req.body.description,
    size: req.body.size,
    title: req.body.title,
  };

  const query = `INSERT INTO ArtworkInformation(price,category,img,art_description,size,title,artist_id) VALUES
  (${newArtwork.price},'${newArtwork.category}','${newArtwork.img}','${newArtwork.description}','${newArtwork.size}','${newArtwork.title}',${newArtwork.artist_id});`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(200).json("New Artwork added...");
  });
});

//get artwork
router.get("/find/:id", (req, res) => {
  //const query = `SELECT * FROM ArtworkInformation where id = '${req.params.id}';`;
  const query = `SELECT  artworkinformation.*,ArtistInformation.artist_name 
  FROM artworkinformation  inner join  ArtistInformation
  where id='${req.params.id}' and artworkinformation.artist_id=ArtistInformation.artist_id;`;
  connection.query(query, (err, artwork) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(artwork);
  });
});

//get all artwork
router.get("/", (req, res) => {
  //console.log(req.query.category);
  if (req.query.category) {
    //const query = `SELECT * FROM ArtworkInformation where category = '${req.query.category}';`;
    const query = `SELECT  artworkinformation.*,ArtistInformation.artist_name 
    FROM artworkinformation  inner join  ArtistInformation
    where category='${req.query.category}' and artworkinformation.artist_id=ArtistInformation.artist_id;`;
    connection.query(query, (err, artwork) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(artwork);
    });
  } else {
    const query = `SELECT artworkinformation.*,ArtistInformation.artist_name FROM ArtworkInformation 
    inner join  ArtistInformation
    where artworkinformation.artist_id=ArtistInformation.artist_id;`;
    connection.query(query, (err, artwork) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(artwork);
    });
  }
});

// //update artwork
// router.put("/update/:id", verifyTokenAndAdmin, (req, res) => {
//   const update = req.body;
//   console.log(update);
//   //console.log(update.category);
//   const query =
//     `Update ArtworkInformation SET ` +
//     Object.keys(update)
//       .map((key) => `${key} = ${update[`${key}`]}`)
//       .join(", ") +
//     ` WHERE id = ${req.params.id};`;
//   console.log(query);

//   connection.query(query, (err) => {
//     if (err) return res.status(500).json(err);
//     else res.status(200).json("Artwork updated...");
//   });
// });

//update artwork
router.put("/update/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `Update artworkinformation set price = ${req.body.price} , title = '${req.body.title}' , art_description = '${req.body.art_description}' where id = ${req.params.id};`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json({ message: 1 });
  });
});

//update stock
router.put("/updatestock/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `Update artworkinformation set  instock  = ${req.body.instock} where id = ${req.params.id};`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).json({ message: 1 });
  });
});

//create newArtist
router.post("/addartist", verifyTokenAndAdmin, (req, res) => {
  const artist = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };

  let query = `SELECT artist_id ,email FROM ArtistInformation WHERE email ='${artist.email}';`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err);
    else if (result[0]) {
      res.status(200).json("artist already existy..");
    } else {
      query = `INSERT INTO ArtistInformation(artist_name,email,phone) VALUES ('${artist.name}','${artist.email}',${artist.phone});`;
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else {
          res.status(200).json("New artist added...");
        }
      });
    }
  });
});

//get artist
router.get("/findartist/:artist_id", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM ArtistInformation where artist_id = ${req.params.artist_id};`;
  connection.query(query, (err, artist) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(artist);
  });
});

router.get("/allartists", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM ArtistInformation;`;
  connection.query(query, (err, artists) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(artists);
  });
});

//update artist
router.put("/updateartist/:artist_id", verifyTokenAndAdmin, (req, res) => {
  const sql = `UPDATE ArtistInformation SET artist_name = '${req.body.name}',email = '${req.body.email}',phone = '${req.body.phone}' WHERE artist_id='${req.params.artist_id}'`;
  // const sql=`UPDATE ArtistInformation SET artist_name= "james Bond",email = "james@gmail.com",phone = "23455533344" WHERE artist_id="1"`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Artist Information Added Successfully ...");
    console.log(result);
    // if (err) res.status(500).json(err);
    // else res.send(result);
  });
});

//delete artist
router.delete("/delete/artist/:id", verifyTokenAndAdmin, (req, res) => {
  const artistId = +req.params.id;
  const query = `DELETE FROM ArtistInformation WHERE artist_id = '${artistId}';`;
  console.log(query);
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(500).json("Deleted Artist successfully....");
  });
});

//delete artwork
router.delete("/delete/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `DELETE FROM ArtworkInformation WHERE id = '${req.params.id}';`;
  //console.log(query);
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(500).json("Deleted Artwork successfully....");
  });
});

router.delete("/delete/artist/:id", verifyTokenAndAdmin, (req, res) => {});

module.exports = router;
