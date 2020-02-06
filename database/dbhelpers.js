const db = require('../database/index');

module.exports = {

  createNewTour: (req, callback) => {
        if (req.body.location) {
          db.query(`INSERT INTO Tours (pano_photos, pic_url, id_user, tour_name, latitude, longitude, sb) VALUES ('{${req.body.id}}', $$${req.body.img_url}$$, ${req.body.id_user}, $$${req.body.tour_name}$$, ${req.body.latitude}, ${req.body.longitude}, '{${0}}') RETURNING id`, (err, results) => {
            if (err) {
              callback(err);
            } else {
              db.query(`UPDATE Users SET created_tours = array_cat(created_tours, '{${results.rows[0].id}}');`, (err, results) => {
                if (err) {
                  callback(err);
                } else {
                  console.log(`successful created new tour`);
                  callback(null, results);
                }
              });
            }
          });
        } else {
          console.log(req.body)
          db.query(`INSERT INTO Tours (pano_photos, pic_url, id_user, tour_name, sb) VALUES ('{${req.body.id}}', $$${req.body.img_url}$$, ${req.body.id_user}, $$${req.body.tour_name}$$, '{${0}}') RETURNING id`, (err, results) => {
            if (err) {
              callback(err);
            } else {
              let tourid = results.rows[0].id;
              db.query(`UPDATE Users SET created_tours = array_cat(created_tours, '{${results.rows[0].id}}');`, (err, results) => {
                if (err) {
                  callback(err);
                } else {
                  console.log(`successful created new tour`);
                  callback(null, {tourid});
                }
              });
            }
          });
        }
      },

      createNewTourSkybox: (req, callback) => {
          db.query(`INSERT INTO Sbindexes (val) VALUES (1) RETURNING id`, (err, result) => {
            if (err) {
              callback(err);
            } else {
              let count = results.rows[0].id;
              db.query(`INSERT INTO Skyboxs (img_url, img_index) VALUES ($$${req.body.img_url}$$, ${count});`, (err, results) => { 
                if (err) {
                  callback(err);
                } else {
                  db.query(`INSERT INTO Tours (skybox_photos, pic_url, id_user, tour_name, sb) VALUES ('{${count}}', $$${req.body.img_url}$$, ${req.body.id_user}, $$${req.body.tour_name}$$, '{${1}}') RETURNING id`, (err, results) => {
                    if (err) {
                      callback(err);
                    } else {
                      let tourid = results.rows[0].id;
                      db.query(`UPDATE Users SET created_tours = array_cat(created_tours, '{${results.rows[0].id}}');`, (err, results) => {
                        if (err) {
                          callback(err);
                        } else {
                          console.log(`successful created new tour`);
                          callback(null, {tourid});
                        }
                      });
                    }
                  });
                }
              });
            }
          });
      },

      addSceneSkybox: (req, callback) => {
        console.log('inside addSceneSkybox dbhelper');
        console.log(req.body);
        db.query(`INSERT INTO Sbindexes (val) VALUES (1) RETURNING id`, (err, result) => {
          if (err) {
            callback(err);
          } else {
            let count = results.rows[0].id;
            db.query(`INSERT INTO Skyboxs (img_url, img_index) VALUES ($$${req.body.img_url}$$, ${count});`, (err, results) => {
              if (err) {
                callback(err);
              } else {
                db.query(`UPDATE Tours SET skybox_photos = array_cat(skybox_photos, '{${count}}'), sb = array_cat(sb, '{${1}}') WHERE id = ${req.body.id}`, (err, results) => {
                  if (err) {
                    callback(err);
                  } else {
                    console.log(`successful created new scene`);
                    callback(null, {count});
                  }
                });
              }
            });
          }
        })
      },

      addAdditionalSceneSkybox: (req, callback) => {
        console.log('inside addAdditionalSBScene dbhelper');
        console.log(req.body);
        db.query(`INSERT INTO Skyboxs (img_url, img_index) VALUES ($$${req.body.img_url}$$, ${req.body.count});`, (err, results) => {
          if (err) {
            callback(err);
          } else {
              console.log(`successful created new scene`);
              callback(null, results);
          }
        });
      },

      addScene1: (req, callback) => {
        console.log('inside addScene1 dbhelper');
        console.log(req.body);
        db.query(`INSERT INTO Panos (img_url) VALUES ($$${req.body.img_url}$$) RETURNING id;`, (err, results) => {
          if (err) {
            callback(err);
          } else {
            let panoId = results.rows[0].id;
            db.query(`UPDATE Tours SET pano_photos = array_cat(pano_photos, '{${results.rows[0].id}}'), sb = array_cat(sb, '{${0}}') WHERE id = ${req.body.id}`, (err, results) => {
              if (err) {
                callback(err);
              } else {
                console.log(`successful created new scene`);
                callback(null, {panoId});
              }
            });
          }
        });
      },

  addScene: (req, callback) => {
    console.log('inside addScene dbhelper');
    console.log(req.body);
    db.query(`INSERT INTO Panos (img_url) VALUES ($$${req.body.img_url}$$) RETURNING id;`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        let panoId = results.rows[0].id;
        db.query(`UPDATE Tours SET pano_photos = array_cat(pano_photos, '{${results.rows[0].id}}') WHERE id = ${req.body.id}`, (err, results) => {
          if (err) {
            callback(err);
          } else {
            console.log(`successful created new scene`);
            callback(null, {panoId});
          }
        });
      }
    });
  },

  getToursByUser: (req, callback) => {
    db.query(`SELECT * FROM Tours WHERE id_user = ${req.params.id_user};`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getScenes: (req, callback) => {
    db.query(`SELECT * from Panos WHERE id = ANY (SELECT unnest(pano_photos) from Tours WHERE id = ${req.params.id_tour})`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getSkyboxScene: (req, callback) => {
    db.query(`SELECT * from Skyboxs where img_index = ${req.params.count} order by img_url`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  addObject: (req, callback) => {
    db.query(`INSERT INTO Objects (x, y, z, object_type, object_value, scale, id_pano) VALUES (0, 0, 0, $$${req.body.object_type}$$, $$${req.body.object_value}$$, '{1, 1, 1}', ${req.body.id_pano}) RETURNING id;`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  updateObject: (req, callback) => {
    console.log(req.body);
    db.query(`UPDATE Objects SET x=${Number(req.body.x)}, y=${Number(req.body.y)}, z=${Number(req.body.z)}, scale='{${req.body.scalex}, ${req.body.scaley}, ${req.body.scalez}}' where id=${req.body.id_object};`, (err, results) => {
      if (err) {
        console.log(err);
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
    db.query(`DELETE FROM Tours WHERE id=${req.params.id};`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  getUser: (req, callback) => {
    console.log(req.params);
    console.log(req.query)
    db.query(`SELECT * from Users WHERE username=$$${req.query.username}$$ AND pw=$$${req.query.pw}$$`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  createUser: (req, callback) => {
    db.query(`INSERT INTO Users (username, pw, email) VALUES ($$${req.body.username}$$, $$${req.body.pw}$$, $$${req.body.email}$$)`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  searchTours: (req, callback) => {
    let results = [];
    console.log(req.query)
    db.query(`SELECT * FROM Tours INNER JOIN Users On Tours.id_user = Users.id WHERE tour_name SIMILAR TO '(${req.query.search}%|%${req.query.search}%|${req.query.search.slice(0,1).toUpperCase() + req.query.search.slice(1)}%)' LIMIT 5;`, (err, tours) => {
      if (err) {
        callback(err);
      }
      results.push(tours.rows);
      db.query(`SELECT * FROM Tours INNER JOIN Users ON Tours.id_user = Users.id WHERE Users.username SIMILAR TO '(${req.query.search}%|%${req.query.search}%|${req.query.search.slice(0,1).toUpperCase() + req.query.search.slice(1)}%)' LIMIT 5;`, (err, userTours) => {
        if (err) {
          callback(err);
        }
        results.push(userTours.rows);
        callback(null, results);
      });
    });
  }
};