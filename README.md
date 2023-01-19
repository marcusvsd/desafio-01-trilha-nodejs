<p align="center"></p>

<h1 align="center">
  Bootcamp Ignite (Trilha NODEJS) - DESAFIO 01
</h1>

<h3 align="center"> 
	<p>Resolução do primeiro desafio da trilha Node.js do Bootcamp Ignite 🚀</p>
</h3>

<p align="center">
 <a href="#sobre">Sobre</a> •
 <a href="#features">Features</a> •
 <a href="#rotas">Rotas</a> •
 <a href="#autor">Autor</a>
</p>

## 💻 Sobre

Esta aplicação gerencia tarefas (em inglês *todos*). É permitido a criação de usuários com ```name``` e ```username```, bem como o CRUD de *todos*.

---

## 🚀 Features

Recursos disponíveis:
- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar um *todo* (`title` e `deadline`) existente;
- Marcar um *todo* com *done* (feito);
- Excluir um *todo*.

## 🚨 Rotas

### POST `/users`

A rota recebe `name`, e `username` dentro do corpo da requisição. Ao cadastrar um novo usuário, ela armazena os dados dentro de um objeto no seguinte formato:

```js
{ 
	id: 'uuid', // precisa ser um uuid
	name: 'Danilo Vieira', 
	username: 'danilo', 
	todos: []
} 
```

### GET `/todos`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e retornar uma lista com todas as tarefas desse usuário.

### POST `/todos`

A rota recebe `title` e `deadline` dentro do corpo da requisição e, uma propriedade `username` contendo o username do usuário dentro do header da requisição. Ao criar um novo *todo*, ele é armazenado na lista `todos` do usuário que está criando essa tarefa. Cada tarefa tem o seguinte formato:

```js
{ 
	id: 'uuid', // precisa ser um uuid
	title: 'Nome da tarefa',
	done: false, 
	deadline: '2021-02-27T00:00:00.000Z', 
	created_at: '2021-02-22T00:00:00.000Z'
}
``` 
**OBS**: Ao fazer a requisição, preencha a data de `deadline` com o formato `ANO-MÊS-DIA`.

### PUT `/todos/:id`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e recebe as propriedades `title` e `deadline` dentro do corpo. É alterado **apenas** o `title` e o `deadline` da tarefa que possua o `id` igual ao `id` presente nos parâmetros da rota.

### PATCH `/todos/:id/done`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e alterar a propriedade `done` para `true` no *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

### DELETE `/todos/:id`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e exclui o *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

---

## 📈 Desafios

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

<aside>
💡 Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dê uma olhada em **[nosso FAQ](https://www.notion.so/ddd8fcdf2339436a816a0d9e45767664)**
</aside>

Para esse desafio, temos os seguintes testes:

### Testes de usuários

- **Should be able to create a new user**

Para que esse teste passe, você deve permitir que um usuário seja criado e retorne um JSON com o usuário criado. Você pode ver o formato de um usuário. 

Também é necessário que você retorne a resposta com o código `201`.

- **Should not be able to create a new user when username already exists**

Para que esse teste passe, antes de criar um usuário você deve validar se outro usuário com o mesmo `username` já existe. Caso exista, retorne uma resposta com status `400` e um json no seguinte formato:

```jsx
{
	error: 'Mensagem do erro'
}
```

A mensagem pode ser de sua escolha, desde que a propriedade seja `error`.

### Testes de *todos*

**Middleware**

Para completar todos os testes referentes à *todos* é necessário antes ter completado o código que falta no middleware `checkExistsUserAccount`. Para isso, você deve pegar o `username` do usuário no header da requisição, verificar se esse usuário existe e então colocar esse usuário dentro da `request` antes de chamar a função `next`. Caso o usuário não seja encontrado, você deve retornar uma resposta contendo status `404` e um json no seguinte formato:

```jsx
{
	error: 'Mensagem do erro'
}
```

**Observação:** O username deve ser enviado pelo header em uma propriedade chamada `username`.

- **Should be able to list all user's todos**

Para que esse teste passe, na rota GET `/todos` é necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount` e então retornar a lista `todos` que está no objeto do usuário conforme foi criado para satisfazer o primeiro teste.

- **Should be able to create a new todo**

Para que esse teste passe, na rota POST `/todos` é necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount`, pegar também o `title` e o `deadline` do corpo da requisição e adicionar um novo *todo* na lista `todos` que está no objeto do usuário. Lembre-se de seguir a estrutura padrão de um *todo*.

Após adicionar o novo *todo* na lista, é necessário retornar um status `201` e o *todo* no corpo da resposta.

- **Should be able to update a todo**

Para que esse teste passe, na rota PUT `/todos/:id` é necessário atualizar um *todo* existente, recebendo o `title` e o `deadline` pelo corpo da requisição e o `id` presente nos parâmetros da rota.

- **Should not be able to update a non existing todo**

Para que esse teste passe, você não deve permitir a atualização de um *todo* que não existe e retornar uma resposta contendo um status `404` e um json no seguinte formato: 

```jsx
{
	error: 'Mensagem do erro'
}
```

- **Should be able to mark a todo as done**

Para que esse teste passe, na rota PATCH `/todos/:id/done` você deve mudar a propriedade `done`de um *todo* de `false` para `true`, recebendo o `id` presente nos parâmetros da rota.

- **Should not be able to mark a non existing todo as done**

Para que esse teste passe, você não deve permitir a mudança da propriedade `done` de um *todo* que não existe e retornar uma resposta contendo um status `404` e um json no seguinte formato: 

```jsx
{
	error: 'Mensagem do erro'
}
```

- **Should be able to delete a todo**

Para que esse teste passe, DELETE `/todos/:id` você deve permitir que um *todo* seja excluído usando o `id` passado na rota. O retorno deve ser apenas um status `204` que representa uma resposta sem conteúdo.

- **Should not be able to delete a non existing todo**

Para que esse teste passe, você não deve permitir excluir um *todo* que não exista e retornar uma resposta contendo um status `404` e um json no seguinte formato:

## 👨 Autor

 <b>Marcus Vinicius</b>
 <br />
 <br />

<a href="https://www.linkedin.com/in/marcusvinicius-seginfo-/">
  <img alt="Perfil LinkedIn - Marcus Vinicius" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
