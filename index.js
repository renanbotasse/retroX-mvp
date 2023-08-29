const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require('./modules/replaceTemplate');

// 1 - Create a server and listen for requests on port 80001.
// 2 - Add the minimal requirement (http) for the server. Revise this point every time to add more requirements.
// 3 - Begin writing the server.
// 4 - We need to read overview, product, and card templates.
// 5 - Create a server with tempOverview and create the HTML structure for tempOverview.
// 6 - Function that reads the list of information from data.json.
// 7 - Use http to handle HTTP requests, fs to read files, and url to manage routes.
// 8 - Make req.url become the pathname for the templates.
// 9 - Understand the difference between readFile and readFileSync.
// 10 - Apply the map function to replaceTemplate(tempCard, el).
// 11 - Create a constant with all the separated information: const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).
// 12 - Use the const cards to update the overview.

// function replaceTemplate was here but we move to modules folder

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf8");

// The information used to build the website comes from the data.json file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Conten-type": "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
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

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
