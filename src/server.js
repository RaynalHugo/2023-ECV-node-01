import express from "express";
import { readFile, writeFile, appendFile } from "fs/promises"
const app = express();
const port = 3000;
app.use(express.json());
app.set("trust proxy", true)

function logMiddleware(req, res, next) {
     appendFile('./log.txt', `\n ${ new Date().toISOString() } : ${ req.url } ${ req.ip }`);
     next();
}
app.use(logMiddleware);

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


app.get("/compteur", async (req, res) => {
    let compteur = await readFile("./src/compteur.txt").then((data) => {
        return parseInt(data.toString());
    });
    compteur++;
    await writeFile("./src/compteur.txt", compteur.toString());
    res.send(`Compteur : ${compteur}`);
});

function authorizationMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization === '123') {
        next();
    } else {
        res.status(401).send('Unauthorized')
    }
}

app.get("/secure", authorizationMiddleware, (req, res) => {
    res.send('Ok');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
