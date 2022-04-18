const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, (req, res) => {
  const newArtwork = {
    artistName: req.body.artistName,
    email: req.body.email,
    phone: req.body.phone,
    id: req.body.id,
    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
    description: req.body.description,
    size: req.body.size,
    title: req.body.title,
  };

  //checking if artist info already exist
  let query = `SELECT artist_id ,email FROM ArtistInformation WHERE email ='${newArtwork.email}';`;

  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err);
    else if (!result[0]) {
      query = `INSERT INTO ArtistInformation(artist_name,email,phone) VALUES ('${newArtwork.artistName}','${newArtwork.email}',${newArtwork.phone});`;
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else {
          console.log("Artist info added to table");
        }
      });
    }
    query = `SELECT artist_id ,email FROM ArtistInformation WHERE email ='${newArtwork.email}';`;
    connection.query(query, (err, result) => {
      if (err) res.status(500).json(err);
      const artist = result;
      //console.log(artist);
      query = `INSERT INTO ArtworkInformation(id,price,category,img,art_description,size,title,artist_id) VALUES
     ('${newArtwork.id}',${newArtwork.price},'${newArtwork.category}','${newArtwork.img}','${newArtwork.description}','${newArtwork.size}','${newArtwork.title}',${artist[0].artist_id});`;
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else res.status(200).json("New Artwork added...");
      });
    });
  });
});

//get artwork
router.get("/find/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `SELECT * FROM ArtworkInformation where id = '${req.params.id}';`;
  connection.query(query, (err, artwork) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(artwork);
  });
});

//get all artwork
router.get("/", verifyTokenAndAdmin, (req, res) => {
  console.log(req.query.category);
  if (req.query.category) {
    const query = `SELECT * FROM ArtworkInformation where category = '${req.query.category}';`;
    connection.query(query, (err, artwork) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(artwork);
    });
  } else {
    const query = `SELECT * FROM ArtworkInformation;`;
    connection.query(query, (err, artwork) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(artwork);
    });
  }
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

//update artwork
router.put("/update/:id", verifyTokenAndAdmin, (req, res) => {
  const update = req.body;
  console.log(update);
  console.log(update.category);
  const query =
    `Update ArtworkInformation SET ` +
    Object.keys(update)
      .map((key) => `${key} = '${update[`${key}`]}'`)
      .join(", ") +
    ` WHERE id = '${req.params.id}';`;
  console.log(query);

  connection.query(query, (err) => {
    if (err) return res.status(500).json(err);
    else res.status(200).json("Artwork updated...");
  });
});

//delete artwork
router.delete("/delete/:id", verifyTokenAndAdmin, (req, res) => {
  const query = `DELETE FROM ArtworkInformation WHERE id = '${req.params.id}';`;
  connection.query(query, (err) => {
    if (err) res.status(500).json(err);
    else res.status(500).json("Deleted Artwork successfully....");
  });
});

router.delete("/delete/artist/:id", verifyTokenAndAdmin, (req, res) => {});

module.exports = router;
