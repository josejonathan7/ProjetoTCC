const express = require('express')

const router = express.Router(); 

router.get("/", (req, res) => {
    return res.render("index")
});

router.get("/animes", (req, res) => {
    return res.render("animes")
});

router.get("/animesPage2", (req, res) => {
    return res.render("animes2")
});

router.get("/games", (req, res) => {
    return res.render("jogos")
});

router.get("/gamesPage2", (req, res) => {
    return res.render("jogos2")
});

router.get("/songs", (req, res) => {
    return res.render("musicas")
});


module.exports = router;