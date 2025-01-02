// regra de negocio de usuários (CRUD) transferida para o controlador de users. index.js apenas cria o servidor. 

let users = require('../mocks/users');

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

    response.send(200, sortedUsers); 
  },


  getUserById(request, response) {
    // método para pegar um usuário pelo id

    const { id } = request.params; // desestruturando o id do request.params

    const user = users.find((user) => user.id === Number(id)); // procura o user com id passado na url. id é uma string, por isso é necessário converter para number (=== compara valor e tipo)
    

    if(!user) {
      return response.send(400, { error: 'User not found' } ); // se nao for encontrado, retorna e para a execução do método, evitando que o código abaixo seja executado
    }
    

    response.send(200, user);
  },

  createUser(request, response) {
    const { body } = request; // desestrutura o body do request
    const lastUserId = users[users.length - 1].id; // pega o id do último usuário
    const newUser = {
      id: lastUserId + 1,
      name: body.name, // o body foi injetado no request pelo bodyParser.js
    };

    users.push(newUser); // adiciona o novo usuário no array de usuários

    response.send(200, newUser);
  },

  updateUser(request, response) {

    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);
    
    const userExists = users.find((user) => user.id === id);

    if(!userExists) {
      return response.send(400, { error: 'User not found' } );
    }

    users = users.map((user) => {
      if(user.id === id) {
        return {
          ...user,
          name,
        };
      }

      return user;
    }); 

    response.send(200, { id, name });

  },

  deleteUser(request, response) {

    let { id } = request.params;
    id = Number(id);

    users = users.filter((user) => user.id !== id);

    response.send(200, { deleted: true });

  }
};