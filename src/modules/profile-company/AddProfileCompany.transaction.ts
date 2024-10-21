import { Connection } from '../../db/MysqlConfig';
import { findOneCompanyQuery, insertCompanyQuery, insertCompanyAddressQuery } from '../company/Company.queries';
import { CompanyDataType } from '../company/Company.types';
import { insertProfileQuery, selectProfileCompanyQuery,SelectProfileCompanyQueryType } from './ProfileCompany.queries';
import { ProfileCategoryType, ProfileCompanyDataType } from './ProfileCompany.types';
import { v4 as uuidv4 } from 'uuid';

export type AddProfileCompanyTransactionParamsType = {
  profileCategory: ProfileCategoryType;
  cnpj: string;
  responsibleCpf: string;
  name: string;
  phone: string;
  mobilePhone: string;
  email: string;
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  termsAccepted: boolean;
};

export interface AddProfileCompanyTransactionInterface {
  execute(params: AddProfileCompanyTransactionParamsType): Promise<ProfileCompanyDataType>;
}

export class AddProfileCompanyTransaction implements AddProfileCompanyTransactionInterface {
  constructor(private readonly dataSource: Connection) {}

  async execute(params: AddProfileCompanyTransactionParamsType): Promise<ProfileCompanyDataType> {
    try {
      const {
        cnpj,
        responsibleCpf,
        name,
        phone,
        mobilePhone,
        email,
        postalCode,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        profileCategory,
        termsAccepted,
      } = params;

      const [foundCompanyResult] = await this.dataSource.execute({ sql: findOneCompanyQuery, values: [cnpj] });

      const foundCompany = foundCompanyResult as unknown as CompanyDataType[];

      const isPersistedCompany = foundCompany.length > 0;

      const companyId = isPersistedCompany ? foundCompany[0].id : uuidv4();

      await this.dataSource.beginTransaction();

      if (!isPersistedCompany) {
        await this.dataSource.execute(
          insertCompanyQuery,
          [companyId, cnpj, responsibleCpf, name, phone, mobilePhone, email]
        );

        await this.dataSource.execute(
          insertCompanyAddressQuery,
          [companyId, postalCode, street, number, complement, neighborhood, city, state]
        );
      }

      await this.dataSource.execute(
        insertProfileQuery,
        [profileCategory, companyId, termsAccepted]
      );

      await this.dataSource.commit();

      const [queryResult] = await this.dataSource.execute({ sql: selectProfileCompanyQuery, values: [companyId, profileCategory] });
      
      const profileCompanyResult = queryResult as unknown as SelectProfileCompanyQueryType[];

      return this.makeProfileCompanyData(profileCompanyResult[0]);
    } catch (error) {
      await this.dataSource.rollback();

      console.error('Executed rollback, transaction error:', error);

      throw error;
    }
  }

  private makeProfileCompanyData(profileCompanyResult: SelectProfileCompanyQueryType): ProfileCompanyDataType {
    return {
      id: profileCompanyResult.profile_id,
      profile_category: profileCompanyResult.profile_category,
      company: {
        id: profileCompanyResult.company_id,
        cnpj: profileCompanyResult.company_cnpj,
        responsible_cpf: profileCompanyResult.company_responsible_cpf,
        name: profileCompanyResult.company_name,
        phone: profileCompanyResult.company_phone,
        mobile_phone: profileCompanyResult.company_mobile_phone,
        email: profileCompanyResult.company_email,
        created_at: profileCompanyResult.company_created_at,
      },
      address: {
        id: profileCompanyResult.address_id,
        company_id: profileCompanyResult.company_id,
        postal_code: profileCompanyResult.address_postal_code,
        street: profileCompanyResult.address_street,
        number: profileCompanyResult.address_number,
        complement: profileCompanyResult.address_complement,
        neighborhood: profileCompanyResult.address_neighborhood,
        city: profileCompanyResult.address_city,
        state: profileCompanyResult.address_state,
        created_at: profileCompanyResult.address_created_at,
      },
      terms_accepted: profileCompanyResult.profile_terms_accepted,
      created_at: profileCompanyResult.profile_created_at,
    }
  }
}
