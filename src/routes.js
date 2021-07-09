const express = require('express');
const AnimesController = require('./controllers/AnimesController');
const GamesController = require('./controllers/GamesController');
const IndexController = require('./controllers/IndexController');
const SongsController = require('./controllers/SongsController');
const UsersObservationSitesController = require('./controllers/UsersObservationSitesController')
const router = express.Router(); 

router.get("/", (req, res) => IndexController.getData(req, res));

router.get("/animes", (req, res) => AnimesController.getPage(req, res));

router.get("/games", (req, res) => GamesController.getPage(req, res));

router.get("/songs", (req, res) => SongsController.getData(req,res));



router.post("/registers", (req, res) =>{UsersObservationSitesController.accesFormNew(req ,res)});

router.get("/registers/update", (req, res) => UsersObservationSitesController.accesFormUpdate(req ,res))

//criação de novos registros
router.post("/registers/observations", (req, res) => UsersObservationSitesController.registerObservation(req,res))

router.post("/registers/sites", (req, res) => UsersObservationSitesController.registerSite(req,res))

router.post("/registers/users", (req, res) => UsersObservationSitesController.registerUsers(req,res))

router.post("/registers/animes", (req, res) => AnimesController.registerAnime(req,res))

router.post("/registers/games", (req, res) => GamesController.registerGame(req,res))

router.post("/registers/songs", (req, res) => SongsController.registerSong(req,res))

//atualização de registros
router.post("/registers/update/observations/:id", (req, res) => UsersObservationSitesController.updatedObservation(req,res))

router.post("/registers/update/sites/:id", (req, res) => UsersObservationSitesController.updatedSite(req,res))

router.post("/registers/update/users/:id", (req, res) => UsersObservationSitesController.updatedUser(req,res))

router.post("/registers/update/animes/:id", (req, res) => AnimesController.updatedAnime(req,res))

router.post("/registers/update/games/:id", (req, res) => GamesController.updatedGame(req,res))

router.post("/registers/update/songs/:id", (req, res) => SongsController.updatedSong(req,res))

//deletar registros
router.post("/registers/delete/observations/:id", (req, res) => UsersObservationSitesController.deleteObservation(req,res))

router.post("/registers/delete/sites/:id", (req, res) => UsersObservationSitesController.deleteSite(req,res))

router.post("/registers/delete/users/:id", (req, res) => UsersObservationSitesController.deleteUser(req,res))

router.post("/registers/delete/animes/:id", (req, res) => AnimesController.deleteAnime(req,res))

router.post("/registers/delete/games/:id", (req, res) => GamesController.deleteGame(req,res))

router.post("/registers/delete/songs/:id", (req, res) => SongsController.deleteSong(req,res))

/*Consultar registro unico*/
router.post("/registers/consult/animes", (req, res) => AnimesController.consultAnime(req, res))
router.post("/registers/consult/games", (req, res) => GamesController.consultGame(req, res))
router.post("/registers/consult/songs", (req, res) => SongsController.consultSong(req, res))
router.post("/registers/consult/sites", (req, res) => UsersObservationSitesController.consultSite(req, res))
router.post("/registers/consult/users", (req, res) => UsersObservationSitesController.consultUser(req, res))
router.post("/registers/consult/observations", (req, res) => UsersObservationSitesController.consultObservation(req, res))

module.exports = router;