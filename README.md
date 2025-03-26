# Around the U.S. - EUA Afora API (Express)

Este é um projeto de API desenvolvido utilizando `Node.js` e o framework `Express.js`. A API fornece dados de usuários e cartões para serem consumidos na plataforma do projeto **[Around the U.S. - EUA Afora](https://github.com/Vinimello90/web_project_around_react#readme)**.

Após instalar todas as ferramentas e dependencias com a linha de comando `npm i`, utilize a linha de comando `npm run start` para iniciar o servidor.

### Endpoints

#### GET /users

Essa rota retorna todos os dados dos usuários em formato JSON.

Exemplo:

```bash
http://localhost:3000/users
```

#### GET /users/:id

Essa rota retorna através do `ID` os dados do usuário em formato JSON.

exemplo:

```bash
http://localhost:3000/cards/12345
```

Substitua `12345` pelo `ID` do usuário desejado.

#### GET /cards

Essa rota retona todos os dados dos cards em formato JSON.

exemplo:

```bash
http://localhost:3000/cards
```

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
