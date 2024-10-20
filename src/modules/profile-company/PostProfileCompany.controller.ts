import { ProfileCategoryType, ProfileCompanyType } from './ProfileCompany.types';
import { ControllerInterface } from '../../api/Controller.interface';
import { ResponseType } from '../../api/Request.types';
import { apiResponseFactory } from '../../api/Response.factory';
import { CreateProfileCompanyServiceInterface } from './CreateProfileCompany.service';
import { Controller } from '../../api/Controller';

type PostProfileCompanyRequestParamsType = {
  profileCategory: ProfileCategoryType;
};

type PostProfileCompanyRequestBodyType = {
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

type PostProfileCompanyRequestType = {
  params:PostProfileCompanyRequestParamsType;
  body: PostProfileCompanyRequestBodyType;
};

export class PostProfileCompanyController extends Controller implements ControllerInterface {
  constructor(
    private readonly createProfileCompanyService: CreateProfileCompanyServiceInterface,
  ) {
    super();
  }

  async handle(request: PostProfileCompanyRequestType): Promise<ResponseType<ProfileCompanyType>> {
    try {
      const profileCompany = await this.createProfileCompanyService.execute({
        ...request.params,
        ...request.body,
      });

      return apiResponseFactory('CREATED', { data: profileCompany });
    } catch (error) {
      return this.handleError(error);
    }
  }
}
