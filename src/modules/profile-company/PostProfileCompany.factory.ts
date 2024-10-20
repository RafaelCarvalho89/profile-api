import { Connection } from '../../db/MysqlConfig';
import { PostProfileCompanyController } from './PostProfileCompany.controller';
import { CreateProfileCompanyService } from './CreateProfileCompany.service';

export const PostProfileCompanyControllerFactory = (dataSource: Connection) => {
  const createProfileCompanyService = new CreateProfileCompanyService();

  return new PostProfileCompanyController(createProfileCompanyService);
}
