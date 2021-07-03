const express = require('express');
const AnimesController = require('./controllers/AnimesController');
const GamesController = require('./controllers/GamesController');
const IndexController = require('./controllers/IndexController');
const SongsController = require('./controllers/SongsController');
const ContactUsersObservationSitesController = require('./controllers/ContactUsersObservationSitesController')
const router = express.Router(); 

router.get("/", (req, res) => IndexController.getData(req, res));

router.get("/animes", (req, res) => AnimesController.getPage1(req, res));

router.get("/animesPage2", (req, res) => AnimesController.getPage2(req, res));

router.get("/games", (req, res) => GamesController.getPage1(req, res));

router.get("/gamesPage2", (req, res) => GamesController.getPage2(req,res));

router.get("/songs", (req, res) => SongsController.getData(req,res));



router.post("/registers", (req, res) =>{ContactUsersObservationSitesController.accesFormNew(req ,res)});

router.get("/registers/update", (req, res) => ContactUsersObservationSitesController.accesFormUpdate(req ,res))

router.get("/registers/delete", (req, res) => ContactUsersObservationSitesController.accesFormDelete(req ,res))

//criação de novos registros
router.post("/registers/contacts", (req, res) => ContactUsersObservationSitesController.registerContact(req,res))

router.post("/registers/observations", (req, res) => ContactUsersObservationSitesController.registerObservation(req,res))

router.post("/registers/sites", (req, res) => ContactUsersObservationSitesController.registerSite(req,res))

router.post("/registers/users", (req, res) => ContactUsersObservationSitesController.registerUsers(req,res))

router.post("/registers/animes", (req, res) => AnimesController.registerAnime(req,res))

router.post("/registers/games", (req, res) => GamesController.registerGame(req,res))

router.post("/registers/songs", (req, res) => SongsController.registerSong(req,res))

//atualização de registros
router.post("/registers/update/contacts/:id", (req, res) => ContactUsersObservationSitesController.updatedContact(req,res))

router.post("/registers/update/observations/:id", (req, res) => ContactUsersObservationSitesController.updatedObservation(req,res))

router.post("/registers/update/sites/:id", (req, res) => ContactUsersObservationSitesController.updatedSite(req,res))

router.post("/registers/update/users/:id", (req, res) => ContactUsersObservationSitesController.updatedUser(req,res))

router.post("/registers/update/animes/:id", (req, res) => AnimesController.updatedAnime(req,res))

router.post("/registers/update/games/:id", (req, res) => GamesController.updatedGame(req,res))

router.post("/registers/update/songs/:id", (req, res) => SongsController.updatedSong(req,res))

//deletar registros
router.post("/registers/delete/contact/:id", (req, res) => ContactUsersObservationSitesController.deleteContact(req,res))

router.post("/registers/delete/observations/:id", (req, res) => ContactUsersObservationSitesController.deleteObservation(req,res))

router.post("/registers/delete/sites/:id", (req, res) => ContactUsersObservationSitesController.deleteSite(req,res))

router.post("/registers/delete/users/:id", (req, res) => ContactUsersObservationSitesController.deleteUser(req,res))

router.post("/registers/delete/animes/:id", (req, res) => AnimesController.deleteAnime(req,res))

router.post("/registers/delete/games/:id", (req, res) => GamesController.deleteGame(req,res))

router.post("/registers/delete/songs/:id", (req, res) => SongsController.deleteSong(req,res))

/*Consultar registro unico*/
router.post("/registers/consult/animes", (req, res) => AnimesController.consultAnime(req, res))
router.post("/registers/consult/games", (req, res) => GamesController.consultGame(req, res))
router.post("/registers/consult/songs", (req, res) => SongsController.consultSong(req, res))
router.post("/registers/consult/sites", (req, res) => ContactUsersObservationSitesController.consultSite(req, res))
router.post("/registers/consult/users", (req, res) => ContactUsersObservationSitesController.consultUser(req, res))
router.post("/registers/consult/observations", (req, res) => ContactUsersObservationSitesController.consultObservation(req, res))
router.post("/registers/consult/contacts", (req, res) => ContactUsersObservationSitesController.consultContact(req, res))



module.exports = router;