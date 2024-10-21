import { CompanyAddressSerializer, CompanySerializer } from '../company/Company.serializer';
import { ProfileCompanyDataType, ProfileCompanyType } from './ProfileCompany.types';

export class ProfileCompanySerializer {
  static serialize(profileData: ProfileCompanyDataType): ProfileCompanyType {
    return {
      id: profileData.id,
      createdAt: profileData.created_at,
      profileCategory: profileData.profile_category,
      company: CompanySerializer.serialize(profileData.company),
      address: CompanyAddressSerializer.serialize(profileData.address),
      termsAccepted: profileData.terms_accepted,
    };
  }
}
