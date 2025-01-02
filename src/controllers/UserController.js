// regra de negocio de usuários (CRUD) transferida para o controlador de users. index.js apenas cria o servidor. 

const users = require('../mocks/users');

module.exports = {
  // metodo para listar usuarios
  listUsers(request, response) {
    console.log(request.query); // request.query foi injetado no request pelo index.js em forma de objeto, podendo agora ser acessado em qualquer lugar da aplicação

    const { order } = request.query; // pega o parametro order da query string do request (URL)

    const sortedUsers = users.sort((a, b) => {
      if(order === 'desc') {
        return a.id < b.id ? 1 : -1; // se o parâmetro order for desc, a ordenação será descendente. Se a.id for menor que b.id, retorna 1 (a.id trocará de posição com b.id). Se não, retorna -1 (a.id não troca de posição com b.id).
      }

      return a.id > b.id ? 1 : -1;

    });

    response.writeHead(200, { 'Content-Type': 'application/json'}); // status code, objeto contém os headers que eu quero passar na resposta
    response.end(JSON.stringify(sortedUsers)); // resposta que será enviada ao cliente (método end só aceita string ou buffer)
  },

  getUserById(request, response) {
    // método para pegar um usuário pelo id

    const { id } = request.params; // desestruturando o id do request.params

    const user = users.find((user) => user.id === Number(id)); // procura o user com id passado na url. id é uma string, por isso é necessário converter para number (=== compara valor e tipo) 

    response.writeHead(200, { 'Content-Type': 'application/json'}); 
    response.end(JSON.stringify({ user }));
  }
};