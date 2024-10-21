import { ProfileCategoryType } from './ProfileCompany.types';

export const insertCompanyQuery = `
  INSERT INTO companies (id, cnpj, responsible_cpf, name, phone, mobile_phone, email)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;

export const insertAddressQuery = `
  INSERT INTO company_addresses (company_id, postal_code, street, number, complement, neighborhood, city, state)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

export const insertProfileQuery = `
  INSERT INTO company_profiles (profile_category, company_id, terms_accepted)
  VALUES (?, ?, ?);
`;

export type SelectProfileCompanyQueryType = {
  profile_id: string;
  profile_category: ProfileCategoryType;
  profile_terms_accepted: boolean;
  profile_created_at: Date;
  company_id: string;
  company_cnpj: string;
  company_responsible_cpf: string;
  company_name: string;
  company_phone: string;
  company_mobile_phone: string;
  company_email: string;
  company_created_at: Date;
  address_id: string;
  address_postal_code: string;
  address_street: string;
  address_number: string;
  address_complement: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_created_at: Date;
};

export const selectProfileCompanyQuery = `
  SELECT
    cp.id AS profile_id,
    cp.profile_category,
    cp.terms_accepted AS profile_terms_accepted,
    cp.created_at AS profile_created_at,
    c.id AS company_id,
    c.cnpj AS company_cnpj,
    c.responsible_cpf AS company_responsible_cpf,
    c.name AS company_name,
    c.phone AS company_phone,
    c.mobile_phone AS company_mobile_phone,
    c.email AS company_email,
    c.created_at AS company_created_at,
    ca.id AS address_id,
    ca.postal_code AS address_postal_code,
    ca.street AS address_street,
    ca.number AS address_number,
    ca.complement AS address_complement,
    ca.neighborhood AS address_neighborhood,
    ca.city AS address_city,
    ca.state AS address_state,
    ca.created_at AS address_created_at
  FROM company_profiles cp
  INNER JOIN companies c ON cp.company_id = c.id
  INNER JOIN company_addresses ca ON c.id = ca.company_id
  WHERE cp.company_id = ?;
`;
