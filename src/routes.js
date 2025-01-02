// routes.js lida com as rotas da aplicação e executar o método associado a ela, enquanto os controllers lidam com a lógica de negócios a partir de seus métodos.

const UserController = require('./controllers/UserController');

module.exports = [ // array em que cada objeto representa uma rota
  {
    endpoint: '/users',  
    method: 'GET',
    handler: UserController.listUsers, // apenas passando a referencia da função. sem parenteses.
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,
  },
];

