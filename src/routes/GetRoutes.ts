import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { GameController } from '../controllers/GamesController';
import { IndexController } from '../controllers/IndexController';
import { RecordsAccessController } from '../controllers/RecordsAccessController';
import { SongController } from '../controllers/SongsController';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';

const getRouter = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const indexController = new IndexController()
const recordsAccessController = new RecordsAccessController()
const authenticateUserController = new AuthenticateUserController()

getRouter.post("/login", authenticateUserController.handleAuthenticate);

getRouter.get("/", indexController.handleGet);

getRouter.get("/animes", animeController.handlePagination);

getRouter.get("/games", gameController.handlePagination);

getRouter.get("/songs", songController.handleGet);

getRouter.get("/registers", ensureAuthenticate, recordsAccessController.accesFormNew)

getRouter.get("/registers/update", ensureAuthenticate, recordsAccessController.accesFormUpdate)

getRouter.post("/registers", authenticateUserController.handleAuthenticate)

export { getRouter };