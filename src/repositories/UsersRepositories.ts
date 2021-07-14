import { Repository, EntityRepository } from 'typeorm';
import { UsersEntity } from '../entities/UsersEntity';

@EntityRepository(UsersEntity)
class UsersRepositories extends Repository<UsersEntity>{

}

export { UsersRepositories }