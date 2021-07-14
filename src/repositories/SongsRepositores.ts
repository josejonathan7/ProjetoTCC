import { EntityRepository, Repository } from 'typeorm';
import { SongsEntity } from '../entities/SongsEntity';

@EntityRepository(SongsEntity)
class SongsRepositories extends Repository<SongsEntity>{

}

export { SongsRepositories }