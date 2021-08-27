import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';

const updateRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

//atualização de registros
updateRouter.put("/registers/update/observations/:id", observationController.handleUpdate)

updateRouter.put("/registers/update/sites/:id", siteController.handleUpdate)

updateRouter.put("/registers/update/users/:id", userController.handleUpdate)

updateRouter.put("/registers/update/animes/:id", animeController.handleUpdate)

updateRouter.put("/registers/update/games/:id", gameController.handleUpdate)

updateRouter.put("/registers/update/songs/:id", songController.handleUpdate)

export { updateRouter }