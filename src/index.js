// importando o módulo http
const http = require('http'); 

const users = require('./mocks/users'); 

// Cria o server
const server = http.createServer((request, response) => {


  // exibe as informações da request recebida pelo servidor
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  if(request.url === '/users' && request.method === 'GET') {

    response.writeHead(200, { 'Content-Type': 'application/json'}); // status code, objeto contém os headers que eu quero passar na resposta
    response.end(JSON.stringify(users)); // resposta que será enviada ao cliente

  } else {
    response.writeHead(404, { 'Content-Type': 'text/html'}); 
    response.end(`Cannot ${request.method} ${request.url}`); // padrão de resposta do express 
  }
  
});

// porta que o servidor irá escutar
server.listen(3000, () => console.log('Server started at http://localhost:3000')); // callback que será executada quando o servidor estiver rodando