import { useEffect, useState } from "react";
import EditPokemon from "./EditPokemon";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);

  //delete pokemon

  const deletePokemon = async (id) => {
    try {
      const deletePokemon = await fetch(`http://localhost:3000/pokemon/${id}`, {
        method: "DELETE",
      });

      setPokemon(pokemon.filter((poke) => poke.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPokemon = async () => {
    try {
      const response = await fetch("http://localhost:3000/pokemon");
      const jsonData = await response.json();
      setPokemon(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>type1</th>
            <th>type2</th>
            <th>level</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((poke) => (
            <tr key={poke.id}>
              <td>{poke.name}</td>
              <td>{poke.type_id}</td>
              <td>{poke.type2_id !== null ? poke.type2_id : "none"}</td>
              <td>{poke.level}</td>
              <td>
                <EditPokemon pokemon={poke} />
              </td>
              <td>
                <button onClick={() => deletePokemon(poke.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
