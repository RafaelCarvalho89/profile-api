import { ConflictValueError } from '../error/services/ConflictValueError.service';
import { ValidatorInterface } from '../validator/Validator';
import { AddProfileCompanyTransactionInterface } from './AddProfileCompany.transaction';
import { FindOneProfileCompanyRepositoryInterface } from './findOneProfileCompany.repository';
import { ProfileCompanySerializer } from './ProfileCompany.serializer';
import { ProfileCategoryType, ProfileCompanyType } from './ProfileCompany.types';

export type CreateProfileCompanyServiceParamsType = {
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

export interface CreateProfileCompanyServiceInterface {
  execute(params: CreateProfileCompanyServiceParamsType): Promise<ProfileCompanyType>;
}

export class CreateProfileCompanyService implements CreateProfileCompanyServiceInterface {
  constructor(
    private readonly validator: ValidatorInterface,
    private readonly findOneProfileCompanyTransaction: FindOneProfileCompanyRepositoryInterface,
    private readonly addProfileCompanyTransaction: AddProfileCompanyTransactionInterface,
  ) {}

  async execute(params: CreateProfileCompanyServiceParamsType): Promise<ProfileCompanyType> {
    await this.validator.validate(params);

    const foundProfileCompany = await this.findOneProfileCompanyTransaction.execute(params);

    if (foundProfileCompany) {
      throw new ConflictValueError('Profile Company already exists for this CNPJ and Profile Category');
    }

    const profileCompany = await this.addProfileCompanyTransaction.execute(params);

    return ProfileCompanySerializer.serialize(profileCompany);
  }
}
