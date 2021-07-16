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

//atualização de registros
router.post("/registers/update/observations/:id", observationController.handleUpdate)

router.post("/registers/update/sites/:id", siteController.handleUpdate)

router.post("/registers/update/users/:id", userController.handleUpdate)

router.post("/registers/update/animes/:id", animeController.handleUpdate)

router.post("/registers/update/games/:id", gameController.handleUpdate)

router.post("/registers/update/songs/:id", songController.handleUpdate)

module.exports = router