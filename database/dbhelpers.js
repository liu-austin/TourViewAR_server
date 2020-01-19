const db = require('../server/index.js')

module.exports = {

  createNewTour: (req, callback) => {
    db.query(`INSERT INTO Panos (img_url) VALUES (${req.body.img_url}) RETURNING id;`, (err, results) => {
      if (err) {
        callback(err)
      } else {
        db.query(`INSERT INTO Tours (pano_photos, id_user) VALUES (${results.rows[0].id}, ${req.body.id_user}) RETURNING id`, (err, results) => {
          if (err) {
            callback(err);
          } else {
            db.query(`UPDATE Users SET array_cat(created_tours, {${results.rows[0].id}});`, (err,results) => {
              if (err) {
                callback(err)
              } else {
                console.log(`successful created new tour`)
                callback(null, {message: "A new tour has been successfully created."})
              }
            });
          }
        });
      }
    });
  },

  addScene: (req, callback) => {
    db.query(`INSERT INTO Panos (img_url) VALUES (${req.body.img_url}) RETURNING id;`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        db.query(`UPDATE Tours SET array_cat(pano_photos, {${results.rows[0].id}})`, (err, results) => {
          if (err) {
            callback(err);
          } else {
            console.log(`successful created new scene`);
            callback(null, {message: "A new scene has been successfully created."});
          }
        });
      }
    });
  },
  
  getToursByUser: (req, callback) => {
    db.query(`SELECT * FROM Tour WHERE id_user = ${req.params.id_user};`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getScenes: (req, callback) => {
    db.query(`SELECT * from Panos WHERE id in (SELECT pano_photos from Tours WHERE id = ${req.params.id_tour})`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  
  addObject: (req, callback) => {
    db.query(`INSERT INTO Objects (x, y, object_value, scale, id_pano) VALUES (0, 0, '${req.body.object_value}', '{1, 1, 1}', ${req.body.id_pano});`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  updateObject: (req, callback) => {
    db.query(`UPDATE Objects SET x=${req.body.x}, y=${req.body.y}, scale='{${req.body.x}, ${req.body.y}, ${req.body.z}}' where id=${req.body.id_object};`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getObjectsByScene: (req, callback) => {
    db.query(`SELECT * from Objects Where id_pano=${req.params.id_pano}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  deleteTourById: (req, callback) => {
    db.query(`DELETE FROM Tour WHERE tour_id=${req.params.id};`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getUser: (req, callback) => {
    db.query(`SELECT * from Users WHERE username=$$${req.body.username}$$ AND pw=$$${req.body.pw}$$`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  createUser: (req, callback) => {
    db.query(`INSERT INTO Users (username, pw, email) VALUES ("${req.body.username}", "${req.body.pw}", "${req.body.email}")`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
};