import { BaseDataType, BaseType } from '../common/Common.types';

export type CompanyDataType = BaseDataType & {
  cnpj: string;
  responsible_cpf: string;
  name: string;
  phone: string;
  mobile_phone: string;
  email: string;
};

export type CompanyAddressDataType = BaseDataType & {
  company_id: string;
  postal_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type CompanyType = BaseType & {
  cnpj: string;
  responsibleCpf: string;
  name: string;
  phone: string;
  mobilePhone: string;
  email: string;
};

export type CompanyAddressType = BaseType & {
  companyId: string;
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};
