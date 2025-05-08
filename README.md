# Around the U.S. - EUA Afora API RESTful

Este é um projeto de API **RESTful** desenvolvido com **Node.js**, **Express.js**, **MongoDB** e **Mongoose**. A API recebe dados, os salva em um banco de dados e fornece informações sobre usuários e cartões para consumo na plataforma do projeto **[Around the U.S. - EUA Afora](https://github.com/Vinimello90/web_project_around_react#readme)**.

## Tecnologias

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcryptjs
- Jsonwebtoken
- Cors
- Winston
- Joi / Celebrate
- PM2
- Nginx

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

## Bcryptjs

Uso a biblioteca **bcryptjs** para transformar senhas em **hashes** antes de armazená-las no banco de dados. Para isso, utilizo a função `bcrypt.hash()`, passando a senha e um número que define o tamanho do **salt** que será adicionado antes da encriptação. O resultado é um **hash** seguro. Para validar uma senha, utilizo a função `bcrypt.compare()`, onde comparo a senha fornecida com a **hash** armazenada.

## Jsonwebtoken

Utilizo a biblioteca **jsonwebtoken** para gerar tokens de autenticação, que permitem identificar o usuário e mantê-lo conectado mesmo após fechar e reabrir a página. Para criar o token, uso a função `jwt.sign()`, que gera uma **hash** contendo informações como o ID do usuário e um prazo de expiração para o token, ficando o token inválido após o expirar sendo necessário um novo login. Para validar o token, uso `jwt.verify()`, que retorna o **payload** com os dados armazenados, como a ID do usuário, se o token for válido.

### Cors

O **CORS (Cross-Origin Resource Sharing)** é um mecanismo de segurança que define quais origens podem acessar recursos no servidor. Para facilitar sua implementação no **Node.js**, utilizo a biblioteca **cors**, que funciona como um middleware e simplifica a configuração do CORS em aplicações web.

### Winston

Utilizo a biblioteca **winston** para registrar logs da aplicação. Em conjunto com o middleware **express-winston**, consigo registrar automaticamente todas as requisições e erros. Para isso, aplico `app.use(requestLogger)` nas requisições e `app.use(errorLogger)` nos erros.

### Joi / Celebrate

Uso o **Joi** para definir e validar esquemas de dados. Já o **Celebrate** é um middleware do **Express** que aplica essas validações automaticamente nas requisições HTTP. Com os dois juntos, consigo garantir entradas seguras e bem estruturadas nas minhas APIs.

### PM2

Utilizo o **PM2** como gerenciador de processos para aplicações **Node.js**. Ele mantém minha API sempre ativa e, caso ocorra alguma falha ou reinicialização do servidor, o **PM2** religa automaticamente a aplicação.

### Nginx

Emprego o **Nginx** como servidor web e proxy reverso. Com ele, consigo redirecionar subdomínios para diferentes destinos — como uma API ou a página web do aplicativo. Também configuro o **CSP (Content Security Policy)** diretamente nos headers das respostas do servidor, reforçando a segurança da aplicação.

## Documentação

Após instalar as dependências com **npm i** e configurar o endereço do **mongodb** e a porta da **API**, inicie o servidor usando o comando **npm run start**.

## Endpoints

### POST /signin

Envia os dados enviados para autenticação, se os dados forem válidos é retornado um token de autorização.

- **email**: mínimo de 2 caracteres.

- **password**: mínimo de 8 caracteres.

Exemplo:

JSON

```json
{
  "email": "exemplo@exemplo.com",
  "about": "12345678"
}
```

### POST /signup

Cria um novo usuário com os dados enviados em JSON e retorna as informações do usuário criado.

- **email**: mínimo de 2 caracteres.

- **password**: mínimo de 8 caracteres.

Exemplo:

JSON

```json
{
  "email": "exemplo@exemplo.com",
  "about": "12345678"
}
```

Endereço (URL)

```bash
http://localhost:3000/signup
```

### GET /users

Retorna todos os dados dos usuários em formato JSON.

\* É necessário enviar o token no headers para autorização.

Exemplo:

```bash
http://localhost:3000/users
```

### GET /users/:userId

Retorna os dados de um usuário específico com base no **ID**, em formato JSON.

\* É necessário enviar o token no headers para autorização.

Exemplo:

```bash
http://localhost:3000/users/12345
```

Substitua **12345** pelo **ID** do usuário desejado.

### GET /users/me

Retorna os dados de um usuário específico com base no **ID** do usuário autorizado, em formato JSON.

\* É necessário enviar o token no headers para autorização.

Exemplo:

```bash
http://localhost:3000/users/me
```

### PATCH /users/me

Atualiza os dados do usuário atual, alterando as propriedades name e about com os dados enviados em JSON, e retorna com as informações atualizadas.

\* É necessário enviar o token no headers para autorização.

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

\* É necessário enviar o token no headers para autorização.

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

\* É necessário enviar o token no headers para autorização.

Exemplo:

```bash
http://localhost:3000/cards
```

### POST /cards

Cria um novo cartão com os dados enviados em JSON e retorna as informações do cartão criado.

\* É necessário enviar o token no headers para autorização.

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

Remove um cartão específico com base no **ID** do cartão se o **ID** do usuário autorizado for o mesmo do proprietário do cartão.

\* É necessário enviar o token no headers para autorização.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345
```

Substitua **12345** pelo **ID** do card desejado.

### PUT /cards/:cardId/likes

Adiciona o **ID** do usuário autorizado ao array de likes do cartão, com base no **ID** do cartão.

\* É necessário enviar o token no headers para autorização.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua **12345** pelo **ID** do card desejado.

### DELETE /cards/:cardId/likes

Remove o ID do usuário autorizado do array de likes do cartão, com base no **ID** do cartão.

\* É necessário enviar o token no headers para autorização.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua **12345** pelo **ID** do card desejado.
