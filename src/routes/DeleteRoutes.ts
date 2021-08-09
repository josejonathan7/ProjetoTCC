import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';

const deleteRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

//deletar registros
deleteRouter.delete("/registers/delete/observations/:id", ensureAuthenticate, observationController.handleDelete)

deleteRouter.delete("/registers/delete/sites/:id", ensureAuthenticate, siteController.handleDelete)

deleteRouter.delete("/registers/delete/users/:id", ensureAuthenticate, userController.handleDelete)

deleteRouter.delete("/registers/delete/animes/:id", ensureAuthenticate, animeController.handleDelete)

deleteRouter.delete("/registers/delete/games/:id", ensureAuthenticate, gameController.handleDelete)

deleteRouter.delete("/registers/delete/songs/:id", ensureAuthenticate, songController.handleDelete)

export { deleteRouter }