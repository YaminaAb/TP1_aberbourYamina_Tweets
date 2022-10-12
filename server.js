const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { maskErrors } = require("graphql-errors");
const { graphql } = require("graphql");
const { PORT } = require("./config");
const app = express();
const fs = require("fs");
const path = require("path");

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

//Définir la page d'accueil 
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"frontend", "index.html"));
});

//utilisation de graphql
maskErrors(schema);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
graphql(
  schema,
  '{ twitter_user(screen_name: "CBCNews") {screen_name tweets {created_at  text retweets_count likes id  } } }'
).then((response) => {
  var newData = JSON.stringify(response.data);
    
  //Enregistrer les data récuperer à partir de L'API dans un fichier json
  fs.writeFile('frontend/static/js/views/tweet.json', newData, err => {
    if(err) throw err;
    console.log("success");
  })
});

app.listen(PORT || 4002, () => {
  console.log("Server running on PORT", PORT);
});


