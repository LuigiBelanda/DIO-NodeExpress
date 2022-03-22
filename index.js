const userRoutes = require("./routes/userRoutes");

const express = require("express");

const app = express();
const port = 3000;

// passando o express como dependência 
userRoutes(app);

// rota
app.get("/", (req, res) => {
  console.log("Primeira rota GET");
  res.send("Olá user!");
});

// iniciando a API
app.listen(port, () => console.log("API rodando na porta 3000"));
