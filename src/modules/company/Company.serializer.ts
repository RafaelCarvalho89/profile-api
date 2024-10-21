import { AddressType } from '../common/Common.types';
import { CompanyAddressDataType, CompanyAddressType, CompanyDataType, CompanyType } from './Company.types';

export class CompanySerializer {
  static serialize(companyData: CompanyDataType): CompanyType {
    return {
      id: companyData.id,
      createdAt: companyData.created_at,
      cnpj: companyData.cnpj,
      responsibleCpf: companyData.responsible_cpf,
      name: companyData.name,
      phone: companyData.phone,
      mobilePhone: companyData.mobile_phone,
      email: companyData.email,
    };
  }
}

export class CompanyAddressSerializer {
  static serialize(addressData: CompanyAddressDataType): AddressType {
    return {
      id: addressData.id,
      createdAt: addressData.created_at,
      postalCode: addressData.postal_code,
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
      neighborhood: addressData.neighborhood,
      city: addressData.city,
      state: addressData.state,
    };
  }
}
