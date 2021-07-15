import { Request, Response } from "express";
import { PaginationAnimeService } from "../../../services/Get/QueryForPagination/PaginationAnimeService";

interface IPaginationRequest {
    current: number;
}


class PaginationAnimeController {

    async handlePagination(request: Request, response: Response){
        const paginationAnimeService = new PaginationAnimeService()

        //código para trabalhar com a páginação da página

        //quantidade de registro por página
        let recordsPerPage = 18

        //página atual
        const urlParams = request.query.page
        const current = Number (urlParams ? urlParams : 1)

        //calculo de registro inicio da página
        let start = (recordsPerPage * current) - recordsPerPage;

        //query que retorna os dados do banco de dados com o total de linhas
        const animePagination = await paginationAnimeService.execute(start, recordsPerPage)
        
        //quantidade de registros
        const totalRows = animePagination[1];

        
        //quantidade de paginas 
        let numberOfPages = Math.ceil(totalRows / recordsPerPage)

        //dados de observação da página

        let noteSuggestion;
        let pageObservation;

        for (let i = 0; i < dataObservation.length; i++) {

            if (dataObservation[i].name.trim() === "sugestão") {
                noteSuggestion = dataObservation[i]
            }

            if (dataObservation[i].name.trim() === "preferencia-anime") {
                pageObservation = dataObservation[i]
            }

            if (!pageObservation) {
                pageObservation = {
                    name: "",
                    information: ""
                }
            }

            if (!noteSuggestion) {
                noteSuggestion = {
                    name: "",
                    information: ""
                }
            }
        }

        //dados de contato no rodapé
        let contactUsers = [];

        for (let i = 0; i < 3; i++) {

            if (dataUsers[i] != null) {
                contactUsers[i] = dataUsers[i]
            }

        }

        return res.render("animes", { contactUsers, dataAnimesLimit, numberOfPages, current: current, dataSuggestion: noteSuggestion, dataObservation: pageObservation })

    }
}

export { PaginationAnimeController }