import { Connection } from '../../db/MysqlConfig';
import { PostProfileCompanyController } from './PostProfileCompany.controller';
import { CreateProfileCompanyService } from './CreateProfileCompany.service';
import { z } from 'zod';
import { Validator } from '../validator/Validator';
import { isValidCNPJ, isValidCPF, UF_REGEX, isValidCEP } from '../validator/Utils';
import { AddProfileCompanyTransaction } from './AddProfileCompany.transaction';

export const PostProfileCompanyControllerFactory = (dataSource: Connection) => {
  const validator = new Validator(CreateProfileCompanySchema);
  const addProfileCompanyTransaction = new AddProfileCompanyTransaction(dataSource);
  const createProfileCompanyService = new CreateProfileCompanyService(validator, addProfileCompanyTransaction);

  return new PostProfileCompanyController(createProfileCompanyService);
}

const CreateProfileCompanySchema = z.object({
  profileCategory: z
    .enum(['seller', 'buyer']),
  cnpj: z
    .string()
    .length(14, 'CNPJ deve ter 14 dígitos')
    .refine(isValidCNPJ, { message: "CNPJ inválido." }),
  responsibleCpf: z
    .string()
    .length(11, 'CPF deve ter 11 dígitos')
    .refine(isValidCPF, { message: "CPF inválido." }),
  name: z
    .string()
    .min(1, 'O nome é obrigatório'),
  phone: z
    .string(),
  mobilePhone: z
    .string(),
  email: z
    .string()
    .email('Email inválido'),
  postalCode: z
    .string()
    .length(8, 'O CEP deve ter 8 dígitos')
    .refine(isValidCEP, { message: "CEP inválido." }),
  street: z
    .string()
    .min(1, 'Logradouro é obrigatório'),
  number: z
    .string()
    .min(1, 'Numero é obrigatório'),
  complement: z
    .string()
    .optional(),
  neighborhood: z
    .string()
    .min(1, 'O bairro é obrigatório'),
  city: z
    .string()
    .min(1, 'Cidade é obrigatória'),
  state: z
    .string()
    .length(2, 'Estado deve ter 2 caracteres')
    .regex(UF_REGEX, 'Estado inválido'),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'O termo deve ser aceito'),
});
