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
  constructor() {}

  async execute(params: CreateProfileCompanyServiceParamsType): Promise<ProfileCompanyType> {
    return mockedProfileCompany;
  }
}

const mockedProfileCompany: ProfileCompanyType = {
  id: 'c51c2f04-ec6a-482f-83bf-480c31a8c2e8',
  profileCategory: 'seller',
  company: {
    id: '05a64fe0-f120-4759-bc14-d080eb9b857a',
    cnpj: '12345678901234',
    responsibleCpf: '12345678901',
    name: 'Company Name',
    phone: '1234567890',
    mobilePhone: '1234567890',
    email: 'company@email.com',
    createdAt: new Date('2024-10-20T00:00:00.000Z'),
  },
  address: {
    id: 'c1df9f25-d92f-48e6-9378-c1e63cc9df06',
    postalCode: '12345678',
    street: 'Av. Brig. Faria Lima',
    number: '123',
    complement: 'apto 3',
    neighborhood: 'bairro',
    city: 'cidade',
    state: 'SP',
    createdAt: new Date('2024-10-20T00:00:00.000Z'),
  },
  termsAccepted: true,
  createdAt: new Date('2024-10-20T00:00:00.000Z'),
};
