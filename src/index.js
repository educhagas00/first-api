// importando o módulo http
const http = require('http'); 

// const url = require('url'); deprecated (não recomendado/obsoleto)
const { URL } = require('url');

const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {

  const parsedUrl = new URL(`http://localhost:3000${request.url}`); 

  // exibe as informações da request recebida pelo servidor
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const searchParams = Object.fromEntries(parsedUrl.searchParams); // transforma o objeto URLSearchParams em um objeto comum js para facilitar a manipulação dos parametros passados na url

  // verifica se a rota requisitada existe no array de rotas
  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if(route) {
    request.query = searchParams;
    route.handler(request, response); // se a rota for encontrada, juntamente de seu método correto, executa o handler definido em UserController.js
  }
  else {
    response.writeHead(404, { 'Content-Type': 'text/html'}); 
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`); // padrão de resposta do express 
  }
  
});

// porta que o servidor irá escutar
server.listen(3000, () => console.log('Server started at http://localhost:3000')); // callback que será executada quando o servidor estiver rodando