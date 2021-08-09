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
            const creatObs = await createObservationService.execute({ name, information });

            //return response.render("Register");
            return response.send(creatObs);
        }catch(err){
            return response.json({error: err.message})
        }
  
    }
    
    async handleUpdate(request: Request, response: Response){
        const id: string = request.params.id;
        const name: string = request.body["observation-name"];
        const information: string = request.body.information;

        const updateObservationService = new UpdateObservationService();

        try{
            const updateObs = await updateObservationService.execute({ id, name, information });
            
            return response.send(updateObs);
            //return response.render("UpdateRegisters");
        }catch(err){
            return response.json({ error: err.message });
        }
    }

    async handleSearch(request: Request, response: Response){
        const name: string = request.body["observation-name"];

        const searchObservationService = new SearchObservationService();

        try{
            const observation = await searchObservationService.execute(name);

            //const status = observation ? response.render("updateDelete/UpdateDeleteShowObservation", { dataResult: observation}) : response.status(401).send("Name Search Not Found!");

            return response.json(observation);
        }catch(err){
            return response.status(400).json({ error: err.message });
        }
    }
    
    async handleGet(){
        const getObservationService = new GetObservationService();

        try{
            const observation = await getObservationService.execute();
        
            return observation;
        }catch(err){
            return JSON.stringify({ error: err.message });
        }
     
    }

    async handleDelete(request: Request, response: Response){
        const id = request.params.id;

        const deleteObservationService = new DeleteObservationService();

        try{
            const deleteObs = await deleteObservationService.execute(id);

            return response.json(deleteObs);
            //return response.render("UpdateRegisters");
        }catch(err){
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ObservationController }