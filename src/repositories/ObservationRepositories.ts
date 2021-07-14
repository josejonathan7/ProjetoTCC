import { Repository, EntityRepository } from 'typeorm';
import { ObservationEntity } from '../entities/ObservationEntity';

@EntityRepository(ObservationEntity)
class ObservationRepositories extends Repository<ObservationEntity>{

}

export { ObservationRepositories }