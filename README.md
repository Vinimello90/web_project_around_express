# Around the U.S. - EUA Afora API RESTful

Este é um projeto de API **RESTful** desenvolvido com **Node.js**, **Express.js**, **MongoDB** e **Mongoose**. A API recebe dados, os salva em um banco de dados e fornece informações sobre usuários e cartões para consumo na plataforma do projeto **[Around the U.S. - EUA Afora](https://github.com/Vinimello90/web_project_around_react#readme)**.

## Tecnologias

- Node.js
- Express.js
- MongoDB
- Mongoose

## Descrição das Tecnologias e Técnicas Utilizadas

### Node.js e Express.js

**Node.js** é um ambiente de execução JavaScript que permite rodar código fora do navegador, possibilitando o desenvolvimento de aplicações **back-end**. O framework **Express.js** foi utilizado para criar o servidor e as rotas da API.

A propriedade **process.env** é utilizada para definir a porta através da variável **PORT**, que pode ser configurada durante a execução. Se não for especificada, a porta padrão será **3000**, utilizada no método `listen()` para inicializar o servidor.

As rotas de requisição para dados de usuários e cartões foram implementadas com os métodos `get()`, `post()`, `put()` e `delete()` do **Express.js**. As rotas foram organizadas em módulos, utilizando o método `Router()` para criar um roteador. O método `require()` do **Node.js** carrega os módulos, e o método `use()` é utilizado para incluí-los no módulo principal.

Também foi implementado um middleware global para tratar erros nas rotas, utilizando o método `use()` no módulo principal para executar ao chamar o método `next()` nas rotas.

### MongoDB

É um banco de dados **NoSQL** orientado a documentos. Em vez de armazenar dados em tabelas, como bancos relacionais (por exemplo, MySQL ou PostgreSQL), ele usa documentos no formato **JSON**.

### Mongoose

É uma biblioteca para **Node.js** que facilita a interação com o **MongoDB**. Utilizando **Schemas** e **Models** do **mongoose**, é validado os e criado os dados dos usuários e dos cards.

Os métodos `find()`, `findById()`, `findByIdAndUpdate()` e `findByIdAndRemove()` são usados para realizar as operações **CRUD** (Create, Read, Update, Delete) e manipular os dados no banco.

## Documentação

Após instalar as dependências com **npm i**, inicie o servidor usando o comando **npm run start**.

## Endpoints

### GET /users

Retorna todos os dados dos usuários em formato JSON.

Exemplo:

```bash
http://localhost:3000/users
```

### GET /users/:userId

Retorna os dados de um usuário específico com base no **ID**, em formato JSON.

Exemplo:

```bash
http://localhost:3000/cards/12345
```

Substitua **12345** pelo **ID** do usuário desejado.

### POST /users

Cria um novo usuário com os dados enviados em JSON e retorna as informações do usuário criado.

- **name**: mínimo de 2 caracteres, máximo de 30.

- **about**: mínimo de 2 caracteres, máximo de 30.

- **avatar**: URL válida.

Exemplo:

JSON

```json
{
  "name": "Tim Berners-Lee",
  "about": "Inventor, scientist",
  "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg"
}
```

Endereço (URL)

```bash
http://localhost:3000/users
```

### PATCH /users/me

Atualiza os dados do usuário atual, alterando as propriedades name e about com os dados enviados em JSON, e retorna com as informações atualizadas.

- **name**: mínimo de 2 caracteres, máximo de 30.

- **about**: mínimo de 2 caracteres, máximo de 30.

**Exemplo:**

JSON

```json
{
  "name": "Tim Berners-Lee",
  "about": "Inventor, scientist"
}
```

Endereço (URL)

```bash
http://localhost:3000/users/me
```

### PATCH /users/me/avatar

Atualiza o avatar do usuário atual com uma **URL** válida enviada em JSON e retorna os dados atualizados.

**Exemplo:**

JSON

```json
{
  "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg"
}
```

Endereço (URL)

```bash
http://localhost:3000/users/me/avatar
```

### GET /cards

Retorna todos os dados dos cartões em formato JSON.

Exemplo:

```bash
http://localhost:3000/cards
```

### POST /cards

Cria um novo cartão com os dados enviados em JSON e retorna as informações do cartão criado.

- **name**: mínimo de 2 caracteres, máximo de 30.

- **link**: URL válida.

**Exemplo:**

JSON

```json
{
  "name": "White Sulphur Springs, WV",
  "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/2008-0831-TheGreenbrier-North.jpg/1024px-2008-0831-TheGreenbrier-North.jpg"
}
```

Endereço (URL)

```bash
http://localhost:3000/cards
```

### DELETE /cards/:cardId

Remove um cartão específico com base no ID do cartão.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345
```

Substitua **12345** pelo **ID** do card desejado.

### PUT /cards/:cardId/likes

Adiciona o **ID** do usuário atual ao array de likes do cartão, com base no **ID** do cartão.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua **12345** pelo **ID** do card desejado.

### DELETE /cards/:cardId/likes

Remove o ID do usuário atual do array de likes do cartão, com base no **ID** do cartão.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua **12345** pelo **ID** do card desejado.
