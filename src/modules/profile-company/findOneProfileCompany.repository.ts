import { Connection } from '../../db/MysqlConfig';
import { findOneProfileCompanyQuery } from './ProfileCompany.queries';
import { ProfileCategoryType, ProfileCompanyDataType } from './ProfileCompany.types';

export type FindOneProfileCompanyRepositoryParamsType = {
  profileCategory: ProfileCategoryType;
  cnpj: string;
};

export interface FindOneProfileCompanyRepositoryInterface {
  execute(params: FindOneProfileCompanyRepositoryParamsType): Promise<ProfileCompanyDataType>;
}

export class FindOneProfileCompanyRepository implements FindOneProfileCompanyRepositoryInterface {
  constructor(private readonly dataSource: Connection) {}

  async execute(params: FindOneProfileCompanyRepositoryParamsType): Promise<ProfileCompanyDataType> {
    try {
      const { profileCategory, cnpj } = params;

      const [queryResult] = await this.dataSource.execute({ sql: findOneProfileCompanyQuery, values: [profileCategory, cnpj] });

      const profileCompanyResult = queryResult as ProfileCompanyDataType[];

      return profileCompanyResult[0];
    } catch (error) {
      throw error;
    }
  }
}
