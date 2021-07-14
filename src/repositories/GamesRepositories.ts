import { Repository, EntityRepository } from 'typeorm';
import { GamesEntity } from '../entities/GamesEntity';

@EntityRepository(GamesEntity)
class GamesRepositories extends Repository<GamesEntity>{

}

export { GamesRepositories }