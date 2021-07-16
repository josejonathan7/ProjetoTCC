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

//router.get("/", IndexController.getData(req, res));

router.get("/animes", animeController.handlePagination);

router.get("/games", gameController.handlePagination);

router.get("/songs", songController.handleGet);

//router.get("/registers", UsersObservationSitesController.redirectUpdateForNewForm(req, res))

//router.post("/registers", UsersObservationSitesController.accesFormNew(req ,res));

//router.get("/registers/update", UsersObservationSitesController.accesFormUpdate(req ,res))

module.exports = router;