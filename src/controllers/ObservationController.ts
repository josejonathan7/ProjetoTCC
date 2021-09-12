import { Request , response, Response } from 'express';
import { CreateObservationService } from '../services/Create/CreateObservationService';
import { DeleteObservationService } from '../services/Delete/DeleteObservationService';
import { GetObservationService } from '../services/Get/GetObservationService';
import { SearchObservationService } from '../services/Search/SearchObservationService';
import { UpdateObservationService } from '../services/Update/UpdateObservationService';

class ObservationController {

    constructor() {}

    async handleCreate(request: Request, response: Response){
        let name: string = request.body["observation-name"];
        let information: string = request.body.information;

        name = name.trim();
        information = information.trim();

        const createObservationService = new CreateObservationService();

        try {
            
            await createObservationService.execute({ name, information });

            return response.status(201).json("ok");
         
        }catch(err: any){
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        let name: string = request.body["observation-name"];
        let information: string = request.body.information;

        name = name.trim();
        information = information.trim();

        const updateObservationService = new UpdateObservationService();

        try{

            await updateObservationService.execute({ id, name, information });
  
            return response.status(200).json("ok");

        }catch(err: any){
            return response.status(400).send(err.message);
        }
    }

    async handleSearch(request: Request, response: Response){
        let name: string = request.body["observation-name"];

        name = name.trim();

        const searchObservationService = new SearchObservationService();

        try{
            const observation = await searchObservationService.execute(name);

            return response.status(200).json({ observation });

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }
    
    async handleSearchId(request: Request, response: Response){
        const id = request.params.id;

        const searchObservationService = new SearchObservationService();

        try{
            const observation = await searchObservationService.executeId(id);

            return response.status(200).json({ observation });

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }
    
    async handleGet(){
        const getObservationService = new GetObservationService();

        try{

            const observation = await getObservationService.execute();
        
            return observation;

        }catch(err: any){
            throw new Error("Falha");
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteObservationService = new DeleteObservationService();

        try{

            await deleteObservationService.execute(id);

            return response.status(200).json("ok");

        }catch(err: any){
            return response.status(404).send(err.message);
        }
    }
}

export { ObservationController }