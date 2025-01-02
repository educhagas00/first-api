function bodyParser(request, callback) {
  let body = '';

  // será criado um event listener para o evento data, que é disparado toda vez que um pedaço de dado (novo chunk) é recebido (forma como os dados são enviados via POST)
  request.on('data', (chunk) => {
    body += chunk; // a cada pedaço de dado recebido, é concatenado os chunks
  });


  // será criado um event listener para o evento end, que é disparado quando todos os dados forem recebidos da stream
  request.on('end', () => {
    body = JSON.parse(body); // ao final da stream, a string de dados será convertida para um objeto javascript por conta do JSON.parse

    request.body = body; // injeta o objeto body na request
    callback(); 
  });
}

module.exports = bodyParser;