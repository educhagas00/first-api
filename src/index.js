// importando o módulo http
const http = require('http'); 

// const url = require('url'); deprecated (não recomendado/obsoleto)
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');

const routes = require('./routes');

// Cria o server
const server = http.createServer((request, response) => {

  const parsedUrl = new URL(`http://localhost:3000${request.url}`); 

  // exibe as informações da request recebida pelo servidor
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const searchParams = Object.fromEntries(parsedUrl.searchParams); // transforma o objeto URLSearchParams em um objeto comum js para facilitar a manipulação dos parametros passados na url


  let = { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean); // separa a rota em um array de strings, separados pelo '/' e remove os valores vazios

  if(splitEndpoint.length > 1) { 
    pathname = `/${splitEndpoint[0]}/:id`; // se o array tiver mais de um elemento. a rota será tratada do tipo /user/:id
    id = splitEndpoint[1]; // o id será o segundo elemento do array
  }


  // verifica se a rota requisitada existe no array de rotas
  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));


  if(route) {
    request.query = searchParams;
    request.params = { id }; // injeta o id na request


    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json'}); 
      response.end(JSON.stringify({ body }));
    };

    if(['POST', 'PUT'].includes(request.method)) { // verifica se a string ta dentro do array 
      bodyParser(request, () => route.handler(request, response) );
    }
    else {
      route.handler(request, response); // se a rota for encontrada, juntamente de seu método correto, executa o handler definido em UserController.js
    }
  }
  else {
    response.writeHead(404, { 'Content-Type': 'text/html'}); 
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`); // padrão de resposta do express 
  }
  
});

// porta que o servidor irá escutar
server.listen(3000, () => console.log('Server started at http://localhost:3000')); // callback que será executada quando o servidor estiver rodando