import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { ObservationController } from '../controllers/ObservationController';
import { SiteController } from '../controllers/SiteController';
import { SongController } from '../controllers/SongsController';
import { UserController } from '../controllers/UserController';
import { ensureAuthenticate } from '../hook/ensureAuthenticate';

const searchRouter = Router();
const animeController = new AnimeController();
const gameController = new GameController();
const songController = new SongController();
const userController = new UserController();
const observationController = new ObservationController();
const siteController = new SiteController();

/*Consultar registro unico*/
searchRouter.post("/registers/consult/animes", animeController.handleSearchName);
searchRouter.get("/registers/consult/animes/:id", animeController.handleSearchId);

searchRouter.post("/registers/consult/games", gameController.handleSearch);
searchRouter.get("/registers/consult/games/:id", gameController.handleSearchId);

searchRouter.post("/registers/consult/songs", songController.handleSearch);
searchRouter.get("/registers/consult/songs/:id", songController.handleSearchId);

searchRouter.post("/registers/consult/sites", siteController.handleSearch);
searchRouter.get("/registers/consult/sites/:id", siteController.handleSearchId);

searchRouter.post("/registers/consult/users", userController.handleSearch);
searchRouter.get("/registers/consult/users/:id", userController.handleSearchId);

searchRouter.post("/registers/consult/observations", observationController.handleSearch);
searchRouter.get("/registers/consult/observations/:id", observationController.handleSearchId);

searchRouter.post("/consult/token", ensureAuthenticate)

export  { searchRouter }