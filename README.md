
# Food Explorer

Food Explorer é o ultimo desafio do curso explorer da Rocketseat. Uma aplicação responsiva de um restaurante onde o usuários pode criar sua conta e o administrador pode gerenciar o restaurante. 
### Usuários

- Criar uma conta e fazer login
- Visualizar os pratos
- Pesquisar pelo nome do prato e o ingrediente que deseja
- Adicionar pratos aos favoritos e ao carrinho
- Simular uma compra e ver o status do pedido

### Admin

- Criar pratos
- Editar pratos
- Deletar pratos
- Alterar status do pedido

## Preview

![Home](https://user-images.githubusercontent.com/91755263/232932089-d96bed53-f011-479d-93c5-1539568ac722.png)

![Details](https://user-images.githubusercontent.com/91755263/224166260-7575de0e-7932-4e68-a756-d35de7d210ba.png)

![Favorites](https://user-images.githubusercontent.com/91755263/232931733-3dfd3270-3000-4e92-85ea-a8dbf9b301f5.png)

![Cart](https://user-images.githubusercontent.com/91755263/232933108-9e72e84e-097c-404c-a51b-e2551e4aff7c.png)

![EditDish](https://user-images.githubusercontent.com/91755263/232933545-93ae77df-f83a-4549-a294-1a1106434ecf.png)

## Referências

 - [NodeJs](https://nodejs.org/en/)
 - [Nodemon](https://nodemon.io/)
 - [Express](https://expressjs.com/) 
 - [SQLite](https://www.sqlite.org/index.html)
 - [Knex](https://knexjs.org/)
 - [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
 - [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
 - [CORS](https://www.npmjs.com/package/cors)
 - [Multer](https://www.npmjs.com/package/multer)
 - [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Clone o projeto

```bash
  git clone https://github.com/gabrielbarros23/Food-Explorer-API.git
```

Entre no diretório do projeto

```bash
  cd .\Food-Explorer-API\
```

Instale as dependências

```bash
  npm install
```

Preencha os campos vazios no arquivo .env.example

```bash
  AUTH_SECRET=
  PORT=
```

Comando de Migration

```bash
  npm run migrate
```

Inicie o servidor

```bash
  npm run dev
```                

## FrontEnd

O FrontEnd esta conectado com a api hospedada no render. No link abaixo estará o repositório FrontEnd com as instruções para conectar-se com o BackEnd no modo desenvolvedor 

[FrontEnd](https://github.com/gabrielbarros23/Food-Explorer-FrontEnd)


## Conta Admin

```bash
  email: admin@admin.com
  senha: admin
```

BackEnd foi hospedado no Render e o FrontEnd no Netlify

  - [Render](https://render.com)
  - [Netlify](https://www.netlify.com/)

**OBS: Por ser uma host gratuita, o BackEnd hiberna após ficar inativo. Ao usar a aplicação, ela dará início normalmente em 1 minuto.**

[Resultado Final](https://food-explorer1.netlify.app/)

