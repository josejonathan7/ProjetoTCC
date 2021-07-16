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

//criação de novos registros
router.post("/registers/observations", observationController.handleCreate)

router.post("/registers/sites", siteController.handleCreate)

router.post("/registers/users", userController.handleCreate)

router.post("/registers/animes", animeController.handleCreate)

router.post("/registers/games", gameController.handleCreate)

router.post("/registers/songs", songController.handleCreate)

module.exports = router