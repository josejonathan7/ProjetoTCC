import { EntityRepository, Repository } from 'typeorm';
import { SitesEntity } from '../entities/SitesEntity'

@EntityRepository(SitesEntity)
class SitesRepositories extends Repository<SitesEntity>{

}

export { SitesRepositories }