import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { GameController } from '../controllers/GamesController';
import { IndexController } from '../controllers/IndexController';
import { RecordsAccessController } from '../controllers/RecordsAccessController';
import { SongController } from '../controllers/SongsController';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';

const router = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const indexController = new IndexController()
const recordsAccessController = new RecordsAccessController()
const authenticateUserController = new AuthenticateUserController()

router.get("/", indexController.handleGet);

router.get("/animes", animeController.handlePagination);

router.get("/games", gameController.handlePagination);

router.get("/songs", songController.handleGet);

router.get("/registers", ensureAuthenticate, recordsAccessController.accesFormNew)

router.get("/registers/update", ensureAuthenticate, recordsAccessController.accesFormUpdate)

router.post("/registers", authenticateUserController.handleAuthenticate)

module.exports = router;