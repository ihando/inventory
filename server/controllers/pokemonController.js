const db = require("../db/pokemonqueries");

async function getPokemon(req, res) {
  const pokemon = await db.getAllPokemon();
  res.json(pokemon);
}

async function getSinglePokemon(req, res) {
  const { id } = req.params;
  const pokemon = await db.getOnePokemon(id);
  res.json(pokemon);
}

async function insertPokemonPost(req, res) {
  const { name, type1, type2, level } = req.body;
  await db.insertPokemon(name, type1, type2, level);
}

async function updatePokemonPut(req, res) {
  const { id } = req.params;
  const { name, type1, type2, level } = req.body;
  const updatePokemon = await db.updatePokemon(id, name, type1, type2, level);
  res.json("update success");
}

async function deletePokemonDelete(req, res) {
  const { id } = req.params;
  const deletePokemon = await db.deletePokemon(id);
  res.json("Pokemon deleted");
}

module.exports = {
  getPokemon,
  insertPokemonPost,
  getSinglePokemon,
  updatePokemonPut,
  deletePokemonDelete,
};
