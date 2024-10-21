import { AddressType, BaseDataType, BaseType } from '../common/Common.types';
import { CompanyAddressDataType, CompanyDataType, CompanyType } from '../company/Company.types';

export type ProfileCategoryType = 'seller' | 'buyer';

export type ProfileCompanyDataType = BaseDataType & {
  profile_category: ProfileCategoryType;
  company: CompanyDataType;
  address: CompanyAddressDataType;
  terms_accepted: boolean;
};

export type ProfileCompanyType = BaseType & {
  profileCategory: ProfileCategoryType;
  company: CompanyType;
  address: AddressType;
  termsAccepted: boolean;
};

export type CompanyProfileDataType = BaseDataType & {
  profileCategory: ProfileCategoryType;
  company_id: string;
  terms_accepted: boolean;
};
