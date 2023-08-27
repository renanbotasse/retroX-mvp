const fs = require("fs");
const http = require("http");
const url = require("url");

// 1 - create a server and listen to a request on port 80001.
// 2 - add minimal require (http) for the server. Revise this point every time to add more requirements.
// 3 - start writing the server
// 4 - We need read overview, product and card templates
// 5 - Criar Server com tempOverview, fazer a estrutura html do tempoOverview
// 6 - Funçao que leia a lista do data.json de informaçoes
// 7 - http para ler os http e fs para ler os arquivos, url para poder fazer as rotas
// 8 - fazer o req.url virar o pathName para as templates
// !9 - diferenca readFile e readeFileSync para
// !10 - map(el => replaceTemplate(tempCard,el))
// 11 -  criamos um const com todas as informaçoes separadas	const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
// 12 - Usamos o cosnt de cards para upar no overview


// funçao replaceTemplate
const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%GAMENAME%}/g, product.productName);
	output = output.replace(/{%IMG1%}/g, product.image1);
	output = output.replace(/{%IMG2%}/g, product.image2);
	output = output.replace(/{%IMG3%}/g, product.image3);
	output = output.replace(/{%PLATFORM%}/g, product.platform);
	output = output.replace(/{%GENRE%}/g, product.genre);
	output = output.replace(/{%YEAR%}/g, product.year);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf8");



// Info usada para montar o site vem do data.json
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview
  if (pathname === "/" || pathname === "/overview") {
	res.writeHead(200, { "Conten-type": "text/html" });
	const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
	const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
	res.end(output);

    
    //product
  } else if (pathname === "/product") {
	res.writeHead(200, { "Conten-type": "text/html" });
	const product = dataObj[query.id];
	const output = replaceTemplate(tempProduct, product);
	res.end(output);

    //api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Conten-type": "application/json" });
    res.end(data);

    //not found
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "not-found",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// }

//Overview

// Product

//API

//not found

server.listen(8006, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
