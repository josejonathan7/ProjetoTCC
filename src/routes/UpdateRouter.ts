import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';

const updateRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

//atualização de registros
updateRouter.post("/registers/update/observations/:id", ensureAuthenticate, observationController.handleUpdate)

updateRouter.post("/registers/update/sites/:id", ensureAuthenticate, siteController.handleUpdate)

updateRouter.post("/registers/update/users/:id", ensureAuthenticate, userController.handleUpdate)

updateRouter.post("/registers/update/animes/:id", ensureAuthenticate, animeController.handleUpdate)

updateRouter.post("/registers/update/games/:id", ensureAuthenticate, gameController.handleUpdate)

updateRouter.post("/registers/update/songs/:id", ensureAuthenticate, songController.handleUpdate)

export { updateRouter }