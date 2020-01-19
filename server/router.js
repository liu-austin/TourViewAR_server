const router = require("express").Router();
const controller = require('./controller');

router
  .route("/login")
  .get(controller.getUser)

router
  .route("signup")
  .post(controller.createUser)

router
  .route("/newtour")
  .post(controller.createNewTour);

router
  .route("/tours/:id_user")
  .get(controller.getToursByUser)

router
  .route("/scenes")
  .get(controller.getScenes)
  .post(controller.addScene);

router  
  .route("/objects/:id_pano")
  .get(controller.getObjectsByScene);

router
  .route("/object")
  .post(controller.addObject)
  .put(controller.updateObject);

router
  .route("/tour/:id")
  .get(controller.getTourById)
  .put(controller.updateTourById)
  .delete(controller.deleteTourById);

// router
//   .route("/uploadPhoto")
//   .get(controller.getUrlInsertDb);

router
  .route('/getpresignedurl/:bucket')
  .get(controller.getUrlInsertDb);

router
  .route('/getpresignedurlforobject/:bucket')
  .get(controller.getUrlInsertDbForObject);

module.exports = router;