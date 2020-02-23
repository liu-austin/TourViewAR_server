const router = require("express").Router();
const controller = require('./controller');

router
  .route("/login")
  .get(controller.getUser)

router
  .route("/signup")
  .post(controller.createUser)

router
  .route("/newtour")
  .post(controller.createNewTour);

router
  .route("/tours/:id_user")
  .get(controller.getToursByUser);

router
  .route("/skyboxtours")
  .post(controller.createNewSkyboxTour);

router
  .route("/skyboxscene")
  .post(controller.addSkyboxScene);

router
  .route("/skyboximage")
  .post(controller.addSkyboxImage);

router
  .route("/scenes")
  .post(controller.addScene);

router
  .route("/getskybox")
  .get(controller.getSkyboxScene);

router
  .route("/scenes/:id_tour")
  .get(controller.getScenes)

router  
  .route("/objects/:id_pano")
  .get(controller.getObjectsByScene);

router  
  .route("/objectsskybox/:id_pano")
  .get(controller.getObjectsByScene1);

router
  .route("/object")
  .post(controller.addObject)
  .put(controller.updateObject);

router
  .route("/objectskybox")
  .post(controller.addObject1)

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
  .route('/getpresignedurlforskybox/:bucket')
  .get(controller.getUrlInsertDbForSkybox);

router
  .route('/getpresignedurlforobject/:bucket')
  .get(controller.getUrlInsertDbForObject);

router
  .route('/search')
  .get(controller.searchTours);

module.exports = router;