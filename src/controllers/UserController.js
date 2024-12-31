// regra de negocio de usuários (CRUD) transferida para o controlador de users. index.js apenas cria o servidor. 

const users = require('../mocks/users');

module.exports = {
  // metodo para listar usuarios
  listUsers(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json'}); // status code, objeto contém os headers que eu quero passar na resposta
    response.end(JSON.stringify(users)); // resposta que será enviada ao cliente
  },
};