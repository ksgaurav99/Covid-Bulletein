const http = require("http");
const fs = require("fs");
const url = require("url");
const makeHomepage = require("./modules/makeHomepage.js");
const makeCountryPage = require("./modules/makeCountryPage.js");

// HTML Files
const home = fs.readFileSync(
  `${__dirname}/templates/template-home.html`,
  "utf-8"
);
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const country = fs.readFileSync(
  `${__dirname}/templates/template-country.html`,
  "utf-8"
);

// API USED : https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/

// Server
const server = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Homepage
  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const finalHTML = await makeHomepage(home, card);

    res.end(finalHTML);
  }

  // Page for a Country
  else if (pathname === "/country") {
    res.writeHead(200, { "Content-Type": "text/html" });

    let finalHTML = await makeCountryPage(country, query.id);
    res.end(finalHTML);
  }

  // Not Found
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
