import { Repository, EntityRepository } from "typeorm";
import { AnimesEntity } from '../entities/AnimesEntity';

@EntityRepository(AnimesEntity)
class AnimesRepositories extends Repository<AnimesEntity>{

}

export { AnimesRepositories }