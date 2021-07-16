import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';

const router = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

/*Consultar registro unico*/
router.post("/registers/consult/animes", animeController.handleSearch)

router.post("/registers/consult/games", gameController.handleSearch)

router.post("/registers/consult/songs", songController.handleSearch)

router.post("/registers/consult/sites", siteController.handleSearch)

router.post("/registers/consult/users", userController.handleSearch)

router.post("/registers/consult/observations", observationController.handleCreate)

module.exports = router