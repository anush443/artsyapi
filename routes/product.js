const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, (req, res) => {
  const newArtwork = {
    artistName: req.body.artistName,
    email: req.body.email,
    phone: req.body.phone,
    artwork_id: req.body.artwork_id,
    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
    description: req.body.description,
    size: req.body.size,
    title: req.body.title,
  };

  //const ;
  //checking if artist info already exist
  let query = `SELECT artist_id ,email FROM ArtistInformation WHERE email ='${newArtwork.email}';`;
  //console.log(query);
  connection.query(query, (err, result) => {
    if (err) res.status(500).json(err);
    else if (!result[0]) {
      //console.log(artist[0].artist_id);
      query = `INSERT INTO ArtistInformation(artist_name,email,phone) VALUES ('${newArtwork.artistName}','${newArtwork.email}',${newArtwork.phone});`;
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else {
          console.log("Artist info added to table");
        }
      });
    }
    if (result[0]) {
      console.log("yes");
      query = `INSERT INTO ArtworkInformation(id,price,category,img,art_description,size,title,artist_id) VALUES 
     ('${newArtwork.artwork_id}',${newArtwork.price},'${newArtwork.category}','${newArtwork.img}','${newArtwork.description}','${newArtwork.size}','${newArtwork.title}',${result[0].artist_id});`;
      connection.query(query, (err) => {
        if (err) res.status(500).json(err);
        else res.status(200).json("New Artwork added...");
      });
    }
  });
});

module.exports = router;

// create table  ArtistInformation(artist_id int auto_increment primary key,artist_name varchar(30),
// email varchar(30),phone bigint);

// create table ArtworkInformation(art_id int auto_increment primary key,price float,category varchar(20),
// image_path varchar(100),art_description varchar(100),size varchar(20),title varchar(30),
// artist_id int,foreign key(artist_id) references ArtistInformation(artist_id));
