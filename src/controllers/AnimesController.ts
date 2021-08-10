import { CreateAnimeService } from "../services/Create/CreateAnimeService";
import { json, Request, Response } from 'express';
import { UpdateAnimeService } from "../services/Update/UpdateAnimeService";
import { SearchAnimeService } from "../services/Search/SearchAnimeService";
import { PaginationAnimeService } from "../services/Get/QueryForPagination/PaginationAnimeService";
import { DeleteAnimeService } from "../services/Delete/DeleteAnimeService";
import { UserController } from "./UserController";
import { GetAnimeService } from "../services/Get/GetAnimeService";

class AnimeController {
    
    async handleCreate(request: Request, response: Response){
        const name: string = request.body["anime-name"];
        const link: string = request.body["anime-link"];
        const image: string = request.body["anime-image"];

        const creatAnimeService = new CreateAnimeService();

        try {

            await creatAnimeService.execute({ name , link, image });

            return response.send("sucess");
            
        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        const name: string = request.body["anime-name"];
        const link: string = request.body["anime-link"];
        const image: string = request.body["anime-image"];

        const updateAnimeService = new UpdateAnimeService();

        try{

            await updateAnimeService.execute({ id, name, link, image });

            return response.send("sucess");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleSearch(request: Request, response: Response){
        const name: string = request.body["anime-name"];

        const searchAnimeService = new SearchAnimeService();

        try{

            const anime = await searchAnimeService.execute(name);

            return response.json({ dataResult: anime });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handlePagination(request: Request, response: Response){
        const paginationAnimeService = new PaginationAnimeService();
        const userController = new UserController();

        try{
    
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


            //dados de contato no rodapé
            let randomUser =  Math.floor(Math.random() * (user.length - 0));
            let contactUsers: string | [];

            if(typeof user === "object"){
                contactUsers = user[randomUser];
            }else {
                contactUsers = user;
            }

            const status = animePagination[0];

            return response.json({ contactUsers, dataAnimesLimit: status, numberOfPages, current });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteAnimeService = new DeleteAnimeService();

        try{

            await deleteAnimeService.execute(id);

            return response.send("ok");
        
        }catch(err){
            return response.status(404).send(err.message);
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
            throw new Error("Falha");
        }
    }
}

export { AnimeController }
