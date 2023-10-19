import express from "express";
import {readFile} from "fs/promises"
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
     res.send("Hello World");
});

app.get("/hello/:username", (req, res) => {
     res.send(`Hello ${req.params.username}`);
});

app.get("/hello/:username/json", (req, res) => {
     res.json({ username: req.params.username });
});

app.get("/html", (req, res) => {
     res.send(`<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      hello
  </body>
  </html>`);
});

app.get("/htmlpropre", async (req, res) => {

  const html = await readFile("./src/index.html");
     res.send(html.toString());
});

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`);
});
