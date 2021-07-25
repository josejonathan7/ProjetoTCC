import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';

const createRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

//criação de novos registros
createRouter.post("/registers/observations", observationController.handleCreate)

createRouter.post("/registers/sites", siteController.handleCreate)

createRouter.post("/registers/users", userController.handleCreate)

createRouter.post("/registers/animes", animeController.handleCreate)

createRouter.post("/registers/games", gameController.handleCreate)

createRouter.post("/registers/songs", songController.handleCreate)

export { createRouter }