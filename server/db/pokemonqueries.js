const pool = require("./db");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function getOnePokemon(id) {
  const { rows } = await pool.query("SELECT * FROM pokemon WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function insertPokemon(name, type1, type2, level) {
  const query = `
      INSERT INTO pokemon (name, type_id, type2_id, level) 
      VALUES ($1, $2, $3, $4)
    `;

  await pool.query(query, [name, type1, type2, level]);
}

async function updatePokemon(id, name, type1, type2, level) {
  const query = `
      UPDATE pokemon SET name = $2, type_id = $3, type2_id = $4, level = $5 WHERE id = $1
    `;
  await pool.query(query, [id, name, type1, type2, level]);
}

async function deletePokemon(id) {
  const deletePokemon = await pool.query("DELETE FROM pokemon WHERE id = $1", [
    id,
  ]);
}

module.exports = {
  insertPokemon,
  getAllPokemon,
  getOnePokemon,
  updatePokemon,
  deletePokemon,
};
