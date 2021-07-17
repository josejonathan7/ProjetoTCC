import { Router } from 'express';
import { AnimeController } from '../controllers/AnimesController';
import { GameController } from '../controllers/GamesController';
import { IndexController } from '../controllers/IndexController';
import { RecordsAccessController } from '../controllers/RecordsAccessController';
import { SongController } from '../controllers/SongsController';

const router = Router()
const animeController = new AnimeController()
const gameController = new GameController()
const songController = new SongController()
const indexController = new IndexController()
const recordsAccessController = new RecordsAccessController()

router.get("/", indexController.handleGet);

router.get("/animes", animeController.handlePagination);

router.get("/games", gameController.handlePagination);

router.get("/songs", songController.handleGet);

router.get("/registers", recordsAccessController.accesFormNew)

router.get("/registers/update", recordsAccessController.accesFormUpdate)

module.exports = router;