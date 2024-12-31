// importando o módulo http
const http = require('http'); 

const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {

  // exibe as informações da request recebida pelo servidor
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  // verifica se a rota requisitada existe no array de rotas
  const route = routes.find((routeObj) => (
    routeObj.endpoint === request.url && routeObj.method === request.method
  ));

  if(route) {
    route.handler(request, response); // se a rota for encontrada, juntamente de seu método correto, executa o handler definido em UserController.js
  }
  else {
    response.writeHead(404, { 'Content-Type': 'text/html'}); 
    response.end(`Cannot ${request.method} ${request.url}`); // padrão de resposta do express 
  }
  
});

// porta que o servidor irá escutar
server.listen(3000, () => console.log('Server started at http://localhost:3000')); // callback que será executada quando o servidor estiver rodando