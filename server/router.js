const router = require("express").Router();
const controller = require('./controller');

// router.route("/newtour").get(controller.createNewTour);

router
  .route("/tours/:id")
  .get(controller.getTourById)
  .put(controller.updateTourById)
  .delete(controller.deleteTourById);

// router
//   .route("/uploadPhoto")
//   .get(controller.getUrlInsertDb);

router
  .route('/getpresignedurl')
  .get(controller.getUrlInsertDb);

module.exports = router;