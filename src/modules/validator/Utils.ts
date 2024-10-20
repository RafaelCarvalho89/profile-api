export const UF_REGEX = /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/;

/**
 * Valida se um CNPJ é válido
 * @param cnpj - O CNPJ em formato numérico, sem máscara
 * @returns boolean - Retorna `true` se o CNPJ for válido, caso contrário `false`
 */
export function isValidCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, '');

  // Verifica se o CNPJ tem 14 dígitos ou se é uma sequência de dígitos repetidos
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  // Função auxiliar para calcular o dígito verificador
  const calculateCheckDigit = (baseCnpj: string, weights: number[]): number => {
    let sum = 0;
    
    for (let i = 0; i < baseCnpj.length; i++) {
      sum += parseInt(baseCnpj.charAt(i)) * weights[i];
    }
    
    const remainder = sum % 11;
    
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Pesos para o cálculo dos dígitos verificadores
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula o primeiro e o segundo dígito verificadores
  const firstCheckDigit = calculateCheckDigit(cnpj.substring(0, 12), firstWeights);
  const secondCheckDigit = calculateCheckDigit(cnpj.substring(0, 13), secondWeights);

  // Verifica se os dígitos verificadores calculados correspondem aos informados no CNPJ
  return firstCheckDigit === parseInt(cnpj.charAt(12)) && secondCheckDigit === parseInt(cnpj.charAt(13));
}

/**
 * Valida se um CPF é válido
 * @param cpf - O CPF em formato numérico, sem máscara
 * @returns boolean - Retorna `true` se o CPF for válido, caso contrário `false`
 */
export function isValidCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se o CPF tem 11 dígitos ou se é uma sequência de dígitos repetidos
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Função auxiliar para calcular o dígito verificador
  const calculateCheckDigit = (baseCpf: string, factor: number): number => {
    let sum = 0;

    for (let i = 0; i < baseCpf.length; i++) {
      sum += parseInt(baseCpf.charAt(i)) * factor--;
    }

    const remainder = sum % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Calcula o primeiro e o segundo dígito verificadores
  const firstCheckDigit = calculateCheckDigit(cpf.substring(0, 9), 10);
  const secondCheckDigit = calculateCheckDigit(cpf.substring(0, 10), 11);

  // Verifica se os dígitos verificadores calculados correspondem aos informados no CPF
  return firstCheckDigit === parseInt(cpf.charAt(9)) && secondCheckDigit === parseInt(cpf.charAt(10));
}

/**
 * Valida se um CEP está dentro do intervalo de 01000000 até 99999999
 * @param cep - O CEP em formato numérico (string com 8 dígitos)
 * @returns boolean - Retorna `true` se o CEP estiver no intervalo válido, caso contrário `false`
 */
export function isValidCEP(cep: string): boolean {
  // Remove qualquer caractere não numérico
  cep = cep.replace(/\D/g, '');

  if (cep.length !== 8) {
    return false;
  }

  const cepNumber = parseInt(cep, 10);

  return cepNumber >= 1000000 && cepNumber <= 99999999;
}
