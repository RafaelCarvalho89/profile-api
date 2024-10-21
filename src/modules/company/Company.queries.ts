export const insertCompanyQuery = `
  INSERT INTO companies (id, cnpj, responsible_cpf, name, phone, mobile_phone, email)
  VALUES (?, ?, ?, ?, ?, ?, ?);
`;

export const insertCompanyAddressQuery = `
  INSERT INTO company_addresses (company_id, postal_code, street, number, complement, neighborhood, city, state)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

export const findOneCompanyQuery = `
  SELECT * FROM companies c
  WHERE c.cnpj = ?;
`;
