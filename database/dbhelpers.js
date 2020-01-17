const db = require('../server/index.js')

module.exports = {
  createNewTour: (req, callback) => {
    return null;
  },

  getTourById: (req, callback) => {
    db.query(`SELECT * FROM Tour WHERE tour_id=${req.params.id};`, (err, results) => {
      if (err) {
        callback(err)
      } else {
        callback(null, results)
      }
    })
  },

  updateTourById: (req, callback) => {
    return null;
  },

  deleteTourById: (req, callback) => {
    db.query(`DELETE FROM Tour WHERE tour_id=${req.params.id};`, (err, results) => {
      if (err) {
        callback(err)
      } else {
        callback(null, results)
      }
    })
  }
}