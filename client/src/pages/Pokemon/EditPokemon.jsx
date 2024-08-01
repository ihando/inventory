import { useState } from "react";

export default function EditPokemon({ pokemon }) {
  const [data, setData] = useState({
    name: pokemon.name,
    type1: pokemon.type_id,
    type2: pokemon.type2_id,
    level: pokemon.level,
  });

  const resetData = () => {
    setData({
      name: pokemon.name,
      type1: pokemon.type_id,
      type2: pokemon.type2_id,
      level: pokemon.level,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePokemon = async (e) => {
    e.preventDefault();
    try {
      const body = { ...data };
      if (body.type2 === "") {
        body.type2 = null;
      }
      const response = await fetch(
        `http://localhost:3000/pokemon/${pokemon.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/pokemon";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${pokemon.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${pokemon.id}`} onClick={resetData}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Pokemon</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={resetData}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                name="name"
                className="form-control"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="type1"
                className="form-control"
                value={data.type1}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="type2"
                className="form-control"
                value={data.type2}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="level"
                className="form-control"
                value={data.level}
                onChange={handleChange}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updatePokemon(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={resetData}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
