const express = require("express");
const app = express();
const indexroute = require("./routes/index");
const pokemonroute = require("./routes/pokemon");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexroute);
app.use("/pokemon", pokemonroute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
