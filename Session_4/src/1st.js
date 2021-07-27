const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/form", function (request, response) {
  response.send(
    `<html lang="en">
        <head>
        <title>Document</title>
        </head>
        <body>
        <h1>GET 메소드</h1>
        <form action="/result" method="GET">
            <input type="text" name="name" />
            <input type="submit" value="전송" />
        </form>

        <h1>GET 메소드</h1>
        <form action="/result_post" method="post">
            <input type="text" name="name" />
            <input type="submit" value="전송" />
        </form>
        </body>
        </html>
    `
  );
});

app.get("/result", function (request, response) {
  response.send(request.query.name);
});

app.get("/result_sec/:name", function (request, response) {});

app.post("/result_post", function (request, response) {
  response.send(request.body.name);
});

app.listen(3000);
