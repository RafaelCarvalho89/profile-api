# Descrição do Projeto.

<p>Este documento fornece informações detalhadas sobre os endpoints da API, formatos de requisição e resposta, e como configurar e executar a aplicação.</p>

<br>

## Índice

- [1.Introdução](#1-introdução)
- [2.Pré-requisitos](#2-pré-requisitos)
- [3.Configuração](#3-configuração)
- [4.Variáveis de Ambiente](#4-variáveis-de-ambiente)
- [5.Executando a Aplicação](#5-executando-a-aplicação)
- [6.Endpoints da API](#6-endpoints-da-api)
  - [6.1.Obter pong](#61-obter-pong)
  - [6.2.Cadastrar Perfil de Empresa](#62-cadastrar-perfil-de-empresa)
- [7.Tratamento de Erros](#7-tratamento-de-erros)
- [8.Esquema do Banco de Dados](#8-esquema-do-banco-de-dados)
- [9.Observações](#9-observações) 
- [10.Licença](#10-licença)

<br />

## 1 Introdução

<p>Esta API permite que os clientes gerenciem perfis de empresas, incluindo detalhes da empresa, endereços e categorias de perfil.</p>

<p>Ela fornece endpoints para criar novos perfis de empresas.</p>

<br />

## 2 Pré-requisitos

 - Docker Compose
 - Node.js
 - Yarn

<br />

## 3 Configuração

**1. Clone o repositório**

```bash
git clone <url-do-repositório>
cd <diretório-do-repositório>
```
<br />

**2. Instale as dependências**

```bash
yarn install
```
<br />

**3. Configure o Banco de Dados**
<p>Inicie o banco de dados MySQL usando o Docker Compose:</p>

```bash
docker-compose up -d
```
<br />

**4. Configure as variáveis de ambiente**
<p>Crie um arquivo .env no diretório raiz copiando o arquivo fornecido env.example:</p>

```bash
cp env.example .env
```

<p>Edite o arquivo .env e preencha os valores necessários.</p>

<br />

## 4 Variáveis de Ambiente

<p>A aplicação requer as seguintes variáveis de ambiente:</p>

 - **Configuração do Banco de Dados:**
    - `MYSQLDB_HOST`: Nome do host do banco de dados MySQL (padrão: localhost ou nome do serviço Docker).
    - `MYSQLDB_PORT`: Número da porta do banco de dados MySQL (padrão: 3306).
    - `MYSQLDB_DATABASE`: Nome do banco de dados MySQL.
    - `MYSQLDB_USER`: Nome de usuário para o banco de dados MySQL.
    - `MYSQLDB_PASSWORD`: Senha para o banco de dados MySQL.
- **Configuração do Servidor da API:**
    - `API_HOST`: Nome do host para o servidor da API (padrão: localhost).
    - `API_PORT`: Número da porta para o servidor da API (padrão: 4568).

<p>Exemplo de arquivo .env:</p>

```bash
MYSQLDB_HOST=localhost
MYSQLDB_PORT=3306
MYSQLDB_DATABASE=wefit_db
MYSQLDB_USER=root
MYSQLDB_PASSWORD=sua_senha
API_HOST=localhost
API_PORT=4568
```

<br />

## 5 Executando a Aplicação

<p>Inicie o servidor da API:</p>

```bash
yarn start
```
<p>O servidor iniciará no host e na porta especificados no arquivo .env.</p>

<br />

## 6 Endpoints da API

### 6.1 Obter pong

#### GET /api/v1/ping

**Descrição:**
<p>Retorna a mensagem "pong" para verificar se o servidor da API está em execução.</p>

**Requisição**
- **Método:** `GET`
- **URL:** `/api/v1/ping`

**Resposta**
- Status: `200 OK`
- Corpo:

```json
{
  "message": "pong"
}
```

<br />

### 6.2 Cadastrar Perfil de Empresa

**Requisição**
- **Método:** `POST`
- **URL:** `/api/v1/profiles/companies/:profileCategory`
- **Cabeçalhos:**
    - `Content-Type: application/json`
- **Parâmetros do Corpo:**
  | Tipo          | Nome                               | Descrição                                                       | Schema   |
  | ------------- | ---------------------------------- | ----------------------------------------------------------------| -------- |
  | **URL param** | **profileCategory** <br>_required_ | Tipo de perfil para cadastro.<br>Obs.: `"seller"` ou `"buyer"`. | string   |
  | **Body**      | **cnpj** <br>_required_            | CNPJ da empresa.                                                | string   |
  | **Body**      | **responsibleCpf** <br>_required_  | CPF do responsável pelo CNPJ.                                   | string   |
  | **Body**      | **name** <br>_required_            | Nome da empresa.                                                | string   |
  | **Body**      | **phone** <br>_required_           | Telefone da empresa.                                            | string   |
  | **Body**      | **mobilePhone** <br>_required_     | Telefone celular da empresa.                                    | string   |
  | **Body**      | **email** <br>_required_           | E-mail da empresa.                                              | string   |
  | **Body**      | **postalCode** <br>_required_      | CEP da empresa.                                                 | string   |
  | **Body**      | **street** <br>_required_          | Logradouro da empresa.                                          | string   |
  | **Body**      | **number** <br>_required_          | Número da empresa.                                              | string   |
  | **Body**      | **complement** <br>_optional_      | Complemento da empresa.                                         | string   |
  | **Body**      | **neighborhood** <br>_required_    | Bairro da empresa.                                              | string   |
  | **Body**      | **city** <br>_required_            | Cidade da empresa.                                              | string   |
  | **Body**      | **state** <br>_required_           | Estado da empresa.                                              | string   |
  | **Body**      | **termsAccepted** <br>_required_   | Se a empresa aceitou os termos de uso.                          | boolean  |

<br />

  #### Exemplo do Corpo da requisição

  ```json
  {
    "cnpj": "12345678901234",
    "responsibleCpf": "12345678901",
    "name": "Nome da Empresa",
    "phone": "1234567890",
    "mobilePhone": "0987654321",
    "email": "empresa@exemplo.com",
    "postalCode": "12345678",
    "street": "Rua Principal",
    "number": "123",
    "complement": "Sala 456",
    "neighborhood": "Centro",
    "city": "Nome da Cidade",
    "state": "SP",
    "termsAccepted": true
  }
  ```

  <br />


**Resposta**
- **Sucesso:**
    - **Status:** `201 Created`
    - **Corpo:**

    ```json
    {
      "data": {
        "id": "c51c2f04-ec6a-482f-83bf-480c31a8c2e8",
        "profileCategory": "seller",
        "company": {
          "id": "05a64fe0-f120-4759-bc14-d080eb9b857a",
          "cnpj": "12345678901234",
          "responsibleCpf": "12345678901",
          "name": "Nome da Empresa",
          "phone": "1234567890",
          "mobilePhone": "0987654321",
          "email": "empresa@exemplo.com",
          "createdAt": "2024-10-20T00:00:00.000Z"
        },
        "address": {
          "id": "c1df9f25-d92f-48e6-9378-c1e63cc9df06",
          "postalCode": "12345678",
          "street": "Rua Principal",
          "number": "123",
          "complement": "Sala 456",
          "neighborhood": "Centro",
          "city": "Nome da Cidade",
          "state": "SP",
          "createdAt": "2024-10-20T00:00:00.000Z"
        },
        "termsAccepted": true,
        "createdAt": "2024-10-20T00:00:00.000Z"
      }
    ```

<br />

- **Erro de Requisição:**
    - **Status:** `400 Bad Request`
    - **Corpo:**

    ```json
    {
      "data": null,
      "error": {
        "error": "INVALID_REQUIREMENTS",
        "message": "Requisitos inválidos para: cnpj. CNPJ deve ter 14 dígitos"
      }
    }
    ```

**Possíveis erros:**
- `INVALID_REQUIREMENTS` (400 Bad Request): Um ou mais parâmetros de entrada são inválidos.
- `INTERNAL_SERVER_ERROR` (500 Internal Server Error): Ocorreu um erro inesperado no servidor.

<br />

## 7 Tratamento de Erros

<p>Erros são retornados em um formato consistente:</p>

```json
{
  "data": null,
  "error": {
    "error": "CÓDIGO_DO_ERRO",
    "message": "Mensagem detalhada do erro."
  }
}
```

- **error:** Um código representando o tipo de erro (por exemplo, INVALID_REQUIREMENTS, INTERNAL_SERVER_ERROR).
- **message:** Uma mensagem que descreve o erro.

<br />

## 8 Esquema do Banco de Dados

<p>O banco de dados utilizado para armazenar os dados é o MySQL.</p>
<p>O esquema do banco de dados inclui as seguintes tabelas:</p>

- `companies`: Armazena detalhes da empresa.
- `company_addresses`: Armazena informações de endereço vinculadas às empresas.
- `company_profiles`: Armazena os perfis de empresas cadastradas como `seller` ou `buyer`.

## 9 Observações

- **Formato de Data:** Todos os campos de data e hora estão no formato ISO 8601 e usam o horário UTC.
- **Campos de ID:** Os campos `id` são UUIDs gerados pela aplicação.
- **Campos Numéricos:** Campos como `cnpj`, `cpf` e `postalCode` são strings contendo apenas dígitos.
- **Sigla do Estado:** O campo `state` deve ser exatamente 2 letras maiúsculas (por exemplo, `SP`, `RJ`).

<br />

## 10 Licença

<p>Este projeto está licenciado sob a licença MIT.</p>

<br />

[Retornar ao Topo ^](#descrição-do-projeto)