const express = require('express');
const AnimesController = require('./controllers/AnimesController');
const GamesController = require('./controllers/GamesController');
const IndexController = require('./controllers/IndexController');
const NewRegisterController = require('./controllers/NewRegisterController');
const SongsController = require('./controllers/SongsController');

const router = express.Router(); 

router.get("/", (req, res) => IndexController.getData(req, res));

router.get("/animes", (req, res) => AnimesController.getData(req, res));

router.get("/animesPage2", (req, res) => AnimesController.getData(req, res));

router.get("/games", (req, res) => GamesController.getData(req, res));

router.get("/gamesPage2", (req, res) => GamesController.getData(req,res));

router.get("/songs", (req, res) => SongsController.getData(req,res));

router.get("/new", (req, res) => NewRegisterController.accesForm(req, res));


router.post("/new", (req, res) => NewRegisterController.newRegister(req, res));
router.post("/new/:id", (req, res) => NewRegisterController.deleteRegister(req, res));


module.exports = router;