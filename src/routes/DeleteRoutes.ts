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

//deletar registros
router.post("/registers/delete/observations/:id", observationController.handleDelete)

router.post("/registers/delete/sites/:id", siteController.handleDelete)

router.post("/registers/delete/users/:id", userController.handleDelete)

router.post("/registers/delete/animes/:id", animeController.handleDelete)

router.post("/registers/delete/games/:id", gameController.handleDelete)

router.post("/registers/delete/songs/:id", songController.handleDelete)

module.exports = router