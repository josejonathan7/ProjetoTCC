import { Request , response, Response } from 'express';
import { CreateObservationService } from '../services/Create/CreateObservationService';
import { DeleteObservationService } from '../services/Delete/DeleteObservationService';
import { GetObservationService } from '../services/Get/GetObservationService';
import { SearchObservationService } from '../services/Search/SearchObservationService';
import { UpdateObservationService } from '../services/Update/UpdateObservationService';

class ObservationController {

    async handleCreate(request: Request, response: Response){
        const name: string = request.body["observation-name"];
        const information: string = request.body.information;

        const createObservationService = new CreateObservationService();

        try {
            
            await createObservationService.execute({ name, information });

            return response.json("ok");
         
        }catch(err){
            return response.status(400).send(err.message);
        }
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        const name: string = request.body["observation-name"];
        const information: string = request.body.information;

        const updateObservationService = new UpdateObservationService();

        try{

            await updateObservationService.execute({ id, name, information });
  
            return response.json("ok");

        }catch(err){
            return response.status(400).send(err.message);
        }
    }

    async handleSearch(request: Request, response: Response){
        const name: string = request.body["observation-name"];

        const searchObservationService = new SearchObservationService();

        try{
            const observation = await searchObservationService.execute(name);

            return response.json({ observation });

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
    
    async handleGet(){
        const getObservationService = new GetObservationService();

        try{

            const observation = await getObservationService.execute();
        
            return observation;

        }catch(err){
            throw new Error("Falha");
        }
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteObservationService = new DeleteObservationService();

        try{

            await deleteObservationService.execute(id);

            return response.json("ok");

        }catch(err){
            return response.status(404).send(err.message);
        }
    }
}

export { ObservationController }