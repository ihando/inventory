const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/", pokemonController.getPokemon);
router.get("/:id", pokemonController.getSinglePokemon);
router.put("/:id", pokemonController.updatePokemonPut);
router.delete("/:id", pokemonController.deletePokemonDelete);
router.post("/", pokemonController.insertPokemonPost);

module.exports = router;
