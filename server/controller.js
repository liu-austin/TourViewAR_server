const dbhelper = require('../database/dbhelpers');
const s3UploadHelper = require('../database/s3UploadHelper');

module.exports = {
  createNewTour: (req, res) => {
    console.log(`hello`);
    // dbhelper.createNewTour(req, (err, results) => {
    //   if (err) {
    //     console.log(err)
    //     res.status(404).send(`error in controller.createNewTour`)
    //   } else {
    //     console.log(`successful controller.createNewTour`)
    //     res.status(200).send(results)
    //   }
    // })
  },

  getTourById: (req, res) => {
    console.log(`you're in controller.getTourById`)
    dbhelper.getTourById(req, (err, results) => {
      if (err) {
        console.log(err)
        res.status(404).send(`error in controller.getTourById`)
      } else {
        console.log(`successful controller.getTourById`)
        res.status(200).send(results)
      }
    });
  },

  updateTourById: (req, res) => {
    console.log(`you're in controller.updateTourById`)
    dbhelper.updateTourById(req, (err, results) => {
      if (err) {
        console.log(err)
        res.status(404).send(`error in controller.updateTourById`)
      } else {
        console.log(`successful controller.updateTourById`)
        res.status(200).send(results)
      }
    });
  },

  deleteTourById: (req, res) => {
    console.log(`you're in controller.deleteTourById`)
    dbhelper.deleteTourById(req, (err, results) => {
      if (err) {
        console.log(err)
        res.status(404).send(`error in controller.deleteTourById`)
      } else {
        console.log(`successful controller.deleteTourById`)
        res.status(200).send(results)
      }
    });
  },

  // getPreSignedUrl: (req, res) => {
  //   console.log(`you're in controller.getPreSignedUrl`)
  //   s3UploadHelper.getPreSignedUrl(req, (err, results) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   });
  // },

  getUrlInsertDb: (req, res) => {
    console.log(`you're in controller.getUrlInsertDb`)
    s3UploadHelper(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
}