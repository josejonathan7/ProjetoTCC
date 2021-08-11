
//controladores do slide da página inicial
let arrayImagesAnimes = []
let arrayImagesGames = []
let currentImage;
let currentImageGames;
let maxImages;
let slideAnimes;
let slideGames
let barPercentage;
let barPercentageGames;
let barAnimes;
let barGames;
let timeChangeSlide;
let timeChangeSlideGames;

//imagens vindo do backend para os slides de animes
const image0 = document.querySelector("#carousel-anime-0").getAttribute("value")
const image1 = document.querySelector("#carousel-anime-1").getAttribute("value")
const image2 = document.querySelector("#carousel-anime-2").getAttribute("value")
const image3 = document.querySelector("#carousel-anime-3").getAttribute("value")
const image4 = document.querySelector("#carousel-anime-4").getAttribute("value")

//imagens vindo do backend para os slides de jogos
const image5 = document.querySelector("#carousel-game-0").getAttribute("value")
const image6 = document.querySelector("#carousel-game-1").getAttribute("value")
const image7 = document.querySelector("#carousel-game-2").getAttribute("value")
const image8 = document.querySelector("#carousel-game-3").getAttribute("value")
const image9 = document.querySelector("#carousel-game-4").getAttribute("value")

//slide de animes

//armazenando o endereço das imagens em um array e criando a tag html IMG
function preloadImageAnimes() {
    arrayImagesAnimes[0] = new Image(500, 390)
    arrayImagesAnimes[0].src = image0;

    arrayImagesAnimes[1] = new Image(500, 390)
    arrayImagesAnimes[1].src = image1;

    arrayImagesAnimes[2] = new Image(500, 390)
    arrayImagesAnimes[2].src = image2;

    arrayImagesAnimes[3] = new Image(500, 390)
    arrayImagesAnimes[3].src = image3;

    arrayImagesAnimes[4] = new Image(500, 390)
    arrayImagesAnimes[4].src = image4;
}

//insere a imagem na div
function loadImageAnimes(indexImage) {
    slideAnimes.style.backgroundImage = "url('" + arrayImagesAnimes[indexImage].src + "')"

}

//executa as funções do slide
function initAnimes() {
    preloadImageAnimes();
    currentImage = 0;
    maxImages = arrayImagesAnimes.length - 1;
    slideAnimes = document.querySelector("div#animes-image")
   

    loadImageAnimes(currentImage)
    timeChangeSlide = 0;
    animaAnimes()
}

//muda de slide quando o botão é clicado
function replacementAnimes(dir) {
    timeChangeSlide = 0;

    currentImage += dir;

    if (currentImage > maxImages) {
        currentImage = 0
    } else if (currentImage < 0) {
        currentImage = maxImages
    }

    loadImageAnimes(currentImage)
}

//faz a animção do carregamento da barra para passar de slide
function animaAnimes() {
    timeChangeSlide++;

    if (timeChangeSlide >= 500) {
        timeChangeSlide = 0;
        replacementAnimes(1);
    }

    barPercentage = timeChangeSlide / 5;

    barAnimes.style.width = barPercentage + "%";

    window.requestAnimationFrame(animaAnimes)

}

//slide de jogos

//armazenando o endereço das imagens em um array e criando a tag html IMG
function preloadImageGames() {
    arrayImagesGames[0] = new Image(500, 390)
    arrayImagesGames[0].src = image5;

    arrayImagesGames[1] = new Image(500, 390)
    arrayImagesGames[1].src = image6;

    arrayImagesGames[2] = new Image(500, 390)
    arrayImagesGames[2].src = image7;

    arrayImagesGames[3] = new Image(500, 390)
    arrayImagesGames[3].src = image8;

    arrayImagesGames[4] = new Image(500, 390)
    arrayImagesGames[4].src = image9;
}

//insere a imagem na div
function loadImageGames(indexImage) {
    slideGames.style.backgroundImage = "url('" + arrayImagesGames[indexImage].src + "')"

}

//executa as funções do slide
function initGames() {
    preloadImageGames();
    currentImageGames = 0;
    maxImages = arrayImagesGames.length - 1;
    slideGames = document.querySelector("div#games-image")
    barGames = document.querySelector("div#box-load-games")

    loadImageGames(currentImageGames)
    timeChangeSlideGames = 0;
    animaGames()
}

//muda de slide quando o botão é clicado
function replacementGames(dir) {
    timeChangeSlideGames = 0;

    currentImageGames += dir;

    if (currentImageGames > maxImages) {
        currentImageGames = 0
    } else if (currentImageGames < 0) {
        currentImageGames = maxImages
    }

    loadImageGames(currentImageGames)
}

//faz a animção do carregamento da barra para passar de slide
function animaGames() {
    timeChangeSlideGames++;

    if (timeChangeSlideGames >= 500) {
        timeChangeSlideGames = 0;
        replacementGames(1);
    }

    barPercentageGames = timeChangeSlideGames / 5;

    barGames.style.width = barPercentageGames + "%";

    window.requestAnimationFrame(animaGames)

}

window.addEventListener("load", initAnimes);

window.addEventListener("load", initGames);






