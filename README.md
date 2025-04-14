# Around the U.S. - EUA Afora API (Express)

Este é um projeto de API desenvolvido utilizando `Node.js` e o framework `Express.js`. A API fornece dados de usuários e cartões para serem consumidos na plataforma do projeto **[Around the U.S. - EUA Afora](https://github.com/Vinimello90/web_project_around_react#readme)**.

## Tecnologias

- Node.js
- Express.js

## Descrição das Tecnologias e Técnicas Utilizadas

### Node.js e Express

`Node.js` é um ambiente de execução para JavaScript, que permite executar códigos JavaScript fora do navegador. Ele possibilita o desenvolvimento de aplicações no back-end, além do front-end. A framework `Express.js` foi utilizada para criar o servidor e as rotas da API.

A propriedade `process.env` foi usada para armazenar o valor da porta na variável `PORT`, que pode ser configurada durante a execução. Caso não seja fornecido um valor, a porta padrão será `3000`, e será usada no método `listen()` para inicializar o servidor e estabelecer a porta de escuta.

As rotas para requisitar dados dos usuários e dos cartões foram criadas utilizando o método `get()` do Express.js. Essas rotas foram separadas em módulos, e utilizado o método `Router()` para criar um roteador para as rotas. O `require()` do Node.js foi usado para carregar esses módulos, e o método `use()` foi aplicado para incluir as rotas no módulo principal da API.

Para ler os arquivos, foi utilizado o módulo `fs` com o método `readFile()`, indicando o caminho para o arquivo e o formato de codificação (encoding). Para tornar o caminho dos arquivos dinâmico e evitar problemas de compatibilidade entre sistemas operacionais, foi utilizado o módulo `path` com o método `join()`.

A propriedade `promises` foi utilizada para ler os arquivos de forma assíncrona. O bloco `try/catch` foi empregado para lidar com erros e evitar o uso de callbacks no `readFile()`, tornando o código mais limpo e fácil de entender e manter.

# Documentação

Após instalar todas as ferramentas e dependencias com a linha de comando `npm i`, utilize a linha de comando `npm run start` para iniciar o servidor.

## Endpoints

### GET /users

Essa rota retorna todos os dados dos usuários em formato JSON.

Exemplo:

```bash
http://localhost:3000/users
```

### GET /users/:id

Essa rota com método GET retorna através do `ID` os dados do usuário em formato JSON.

Exemplo:

```bash
http://localhost:3000/cards/12345
```

Substitua `12345` pelo `ID` do usuário desejado.

### POST /users

Essa rota recebe um JSON com as propriedades "name", "about" e "avatar" para criar um novo usuário e retorna os dados em formato JSON.

- Propriedade "name" precisa de no mínimo de 2 caracteres e tem limite máximo de 30 caracteres

- Propriedade "about" precisa de no mínimo de 2 caracteres e tem limite máximo de 30 caracteres.

- Propriedade "avatar" precisa ser uma URL válida.

- Todos os campos são obrigatórios.

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

Essa rota recebe um JSON com as propriedades "name" e "about" para alterar os dados do usuário atual e retorna os dados em formato JSON.

- Propriedade "name" precisa de no mínimo de 2 caracteres e tem limite máximo de 30 caracteres

- Propriedade "about" precisa de no mínimo de 2 caracteres e tem limite máximo de 30 caracteres.

- Todos os campos são obrigatórios.

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

Essa rota recebe um JSON com a propriedade "avatar" para alterar a URL do avatar do usuário atual e retorna os dados em formato JSON.

- Propriedade "avatar" precisa ser uma URL válida.

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

Essa rota retona todos os dados dos cards em formato JSON.

Exemplo:

```bash
http://localhost:3000/cards
```

### POST /cards

Essa rota recebe um JSON com as propriedades "name" e "link" para criar um novo card e retorna os dados em formato JSON.

- Propriedade "name" precisa de no mínimo de 2 caracteres e tem limite máximo de 30 caracteres

- Propriedade "link" precisa ser uma URL válida.

- Todos os campos são obrigatórios.

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

Essa rota requisita através do `ID` do card passado no parâmetro da rota a remoção do card.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345
```

Substitua `12345` pelo `ID` do card desejado.

### PUT /cards/:cardId/likes

Essa rota requisita através do `ID` do card a alteração da propriedade likes do card, adicionando a `ID` do usuário atual ao array de likes.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua `12345` pelo `ID` do card desejado.

### DELETE /cards/:cardId/likes

Essa rota requisita através do `ID` do card a alteração da propriedade likes do card, removendo a `ID` do usuário atual do array de likes.

**Exemplo**

Endereço (URL)

```bash
http://localhost:3000/cards/12345/likes
```

Substitua `12345` pelo `ID` do card desejado.
