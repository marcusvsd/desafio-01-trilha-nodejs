const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if(!user) return response.status(400).json({error: "Username not found!"});

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExists = users.some(
    (user) => user.username === username
  );

  if(usernameAlreadyExists) return response.status(400).json({error: "Username already exists!"});

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  return response.status(201).send();
});

app.use(checksExistsUserAccount);

app.get('/todos', (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', (request, response) => {
  const { title, deadline } = request.body;

  const { user } = request;

  const todosOperation = {
    id: uuidv4,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todosOperation);

  return response.json(201).send();
});

app.put('/todos/:id', (request, response) => {
  const { title, deadline } = request.body;

  const { user } = request;

  const { id } = request.query;

  const idExists = users.some(
    (user) => user.id === id
  );

  if (!idExists) return response.status(400).json({error: "ID doesn\'t exists!"});

  const modOperation = {
    //
  }
});

app.patch('/todos/:id/done', (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', (request, response) => {
  // Complete aqui
});

module.exports = app;
