const db = require("../db/pokemonqueries");
const { body, validationResult } = require("express-validator");

const validatePokemon = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("type1").isInt().withMessage("Type1 must be an integer"),
  body("type2")
    .optional({ nullable: true })
    .isInt()
    .withMessage("Type2 must be an integer."),
  body("level")
    .isInt({ min: 1, max: 100 })
    .withMessage("Level must be an integer between 1 and 100"),
];

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, type1, type2, level } = req.body;
  await db.insertPokemon(name, type1, type2, level);
}

async function updatePokemonPut(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, type1, type2, level } = req.body;
  await db.updatePokemon(id, name, type1, type2, level);
}

async function deletePokemonDelete(req, res) {
  const { id } = req.params;
  const deletePokemon = await db.deletePokemon(id);
  res.json("Pokemon deleted");
}

module.exports = {
  getPokemon,
  insertPokemonPost: [...validatePokemon, insertPokemonPost],
  getSinglePokemon,
  updatePokemonPut: [...validatePokemon, updatePokemonPut],
  deletePokemonDelete,
};
