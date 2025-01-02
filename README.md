# First API project with Node.js

This basic API project uses nothing but raw Node.js.

## Requisitos

- Node.js v14 ou superior

## Instalação

1. Clonar o repositório:
```bash
  git clone git@github.com:educhagas00/first-api.git
  ```
2. Navegar até o diretório do projeto:
  ```bash
  cd first-api
  ```
## Testando a API

Primeiro, é preciso iniciar o servidor. Para isso, execute o comando:
```bash
node src/index.js
```
Navegue para `http://localhost:3000`. É onde a API estará disponível.

## Endpoints

### GET /users
Este endpoint retorna a lista de usuários disponíveis em memória.

**Resposta:**
```json
[
  {
  "id": 1,
  "name": "Dudu"
  },
  {
  "id": 2,
  "name": "vmigu"
  }
]
```
### GET /users/:id

Este endpoint rotorna um usuário específico. Caso o usuário não exista, é apresentada uma tela de erro bad request.

/users/1

**Resposta:**
```json
[
  {
  "id": 1,
  "name": "Dudu"
  }
]
```

### POST /users

Este endpoint apenas adiciona um novo usuário.

**Requisição:**
```json
{
  "name": "Auggie"
}
```

**Resposta:**
```json
{
  "id": 3,
  "name": "Auggie"
}
```

### DELETE /users/1

Este endpoint deleta um usuário específico da memória. Caso não exista, é apresentada uma tela de erro bad request.

**Resposta:**
```json
{
  "deleted": true
}
```

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
