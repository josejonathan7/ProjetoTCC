import { CreateAnimeService } from "../services/Create/CreateAnimeService";
import { json, Request, Response } from 'express';
import { UpdateAnimeService } from "../services/Update/UpdateAnimeService";
import { SearchAnimeService } from "../services/Search/SearchAnimeService";
import { PaginationAnimeService } from "../services/Get/QueryForPagination/PaginationAnimeService";
import { DeleteAnimeService } from "../services/Delete/DeleteAnimeService";
import { UserController } from "./UserController";
import { ObservationController } from "./ObservationController";
import { GetAnimeService } from "../services/Get/GetAnimeService";

class AnimeController {
    
    async handleCreate(request: Request, response: Response){
        const name: string = request.body["anime-name"];
        const link: string = request.body["anime-link"];
        const image: string = request.body["anime-image"];

        const creatAnimeService = new CreateAnimeService();

        try {
            const creatAnime = await creatAnimeService.execute({ name , link, image });

            //return response.render("Register");
            return response.send(creatAnime);
        }catch(err){
            return response.json({error: err.message})
        }

        //return response.render("Register")
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        const name: string = request.body["anime-name"];
        const link: string = request.body["anime-link"];
        const image: string = request.body["anime-image"];

        const updateAnimeService = new UpdateAnimeService();

        try{
            const updateAnime = await updateAnimeService.execute({ id, name, link, image });

            //return response.render("UpdateRegisters");
            return response.send(updateAnime);
        }catch(err){
            return response.json({ error: err.message });
        }
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["anime-name"]

        const searchAnimeService = new SearchAnimeService()

        try{
            const anime = await searchAnimeService.execute(name)

            //const status = anime ? response.render("updateDelete/UpdateDeleteShowAnime", { dataResult: anime }) : response.status(401).send("Name Search Not Found!")

            return response.json(anime)
        }catch(err){
            return response.status(401).json({ error: err.message });
        }
    }
    
    async handlePagination(request: Request, response: Response){
        const paginationAnimeService = new PaginationAnimeService();
        const userController = new UserController();
        const observationController = new ObservationController();

        try{
            const observation = await observationController.handleGet();
            const user = await userController.handleGet();

            //código para trabalhar com a páginação da página

            //quantidade de registro por página
            let recordsPerPage = 2;

            //página atual
            const urlParams = request.query.page;
            const current = Number (urlParams ? urlParams : 1);

            //calculo de registro inicio da página
            let start = (recordsPerPage * current) - recordsPerPage;

            //query que retorna os dados do banco de dados com o total de linhas
            const animePagination = await paginationAnimeService.execute(start, recordsPerPage);
            

            //quantidade de registros
            const totalRows = animePagination[1];

            
            //quantidade de paginas 
            let numberOfPages = Math.ceil(Number(totalRows) / recordsPerPage);

            //dados de observação da página

            let noteSuggestion;
            let pageObservation;

            if(typeof observation === "object"){
                for (let i = 0; i < observation.length; i++) {

                    if (observation[i].name.trim() === "sugestão") {
                        noteSuggestion = observation[i];
                    }

                    if (observation[i].name.trim() === "preferencia-anime") {
                        pageObservation = observation[i];
                    }

                    if (!pageObservation) {
                        pageObservation = {
                            name: "",
                            information: ""
                        };
                    }

                    if (!noteSuggestion) {
                        noteSuggestion = {
                            name: "",
                            information: ""
                        };
                    }
                }
            }else{
                noteSuggestion = observation;
                pageObservation = observation;
            }



            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser]
            }else {
                contactUsers = user;
            }

            const status = animePagination ?  animePagination[0] : response.status(401).send("Load Pagination Failed!");
            
            //return response.render("animes", { contactUsers, dataAnimesLimit: status, numberOfPages, current, dataSuggestion: noteSuggestion, dataObservation: pageObservation });

            return response.json({contactUsers, noteSuggestion, pageObservation, status, numberOfPages, current});

        }catch(err){
            return response.json({ error: err.message });
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteAnimeService = new DeleteAnimeService();

        try{
            const deletAnime = await deleteAnimeService.execute(id);

            //return response.render("UpdateRegisters")
            return response.json(deletAnime);

        }catch(err){
            return response.status(400).json({ error: err.message });
        }
    }

    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    async handleGetAll(){
        const getAnimeService = new GetAnimeService();

        try{
            const animes = await getAnimeService.execute();
            let animesCarousel = [];

            if(animes){

                for(let i=0; i<5; i++){

                    let animesfilter = Math.floor(Math.random() * (animes.length - 0));
                    animesCarousel[i] = animes[animesfilter];
                }

            }

            return animesCarousel;
        }catch(err){
            return JSON.stringify({ error: err.message });
        }
    }
}

export { AnimeController }
