const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/", pokemonController.getHandler);

module.exports = router;
