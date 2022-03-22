const fs = require("fs");
const { join } = require("path");

// caminho para um arquivo
console.log("Caminho do diretório:", __dirname);
const filePath = join(__dirname, "users.json");

const getUsers = () => {
  // verificando se o arquivo que queremos existe, se existir lemos ele e colocamos os dados na var data
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

  // tratando erros
  // se der certo retornarmos um json parseado com os dados que pegamos do arquivo
  try {
    return JSON.parse(data);
  } catch (err) {
    // se não apenas retornamos um objeto vazio
    return [];
  }
};

const saveUser = (users) => {
  // escrevendo dados no arquivo JSON
  fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
};

// criando a função que toma conta da rota
const userRoutes = (app) => {
  // criando a rota em si passando como param o ID do user
  app
    .route("/users/:id?")
    .get((req, res) => {
      const users = getUsers();

      res.send({ users });
    })

    .post((req, res) => {
      const users = getUsers();

      console.log("Dados da requisição:", req.body);

      users.push(req.body);
      saveUser(users);

      return res.status(201).send("OK");
    })

    .put((req, res) => {
      const users = getUsers();
      
      saveUser(
        // percorrendo os dados com map
        users.map((user) => {
          // vendo se o id do user que queremos é o mesmo que passamos na req
          if (user.id === req.params.id) {
            return {
              ...user,
              ...req.body,
            };
          }

          return user;
        }),

        res.status(200).send("OK")
      );
    })

    .delete((req, res) => {
      const users = getUsers();

      saveUser(users.filter((user) => user.id !== req.params.id));

      res.status(200).send("OK");
    });
};

module.exports = userRoutes;
