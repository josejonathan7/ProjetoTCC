import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';

const searchRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const userController = new UserController()
const observationController = new ObservationController()
const siteController = new SiteController()

/*Consultar registro unico*/
searchRouter.post("/registers/consult/animes", animeController.handleSearch)

searchRouter.post("/registers/consult/games", gameController.handleSearch)

searchRouter.post("/registers/consult/songs", songController.handleSearch)

searchRouter.post("/registers/consult/sites", siteController.handleSearch)

searchRouter.post("/registers/consult/users", userController.handleSearch)

searchRouter.post("/registers/consult/observations", observationController.handleSearch)

export  { searchRouter }