const express = require("express");

const app = express();

app.use(express.json())
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get("/api", (_req, res) => {
  res.send({message: "HELLO FROM BACKEND!"});
});

app.listen(8080, () => {
  console.log("Server is listening on :8080");
});

//TODO: add prettier and eslint