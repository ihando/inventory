import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";

export default function Pokemon() {
  const [formData, setFormData] = useState({
    name: "",
    type1: "",
    type2: "",
    level: "",
  });

  const [errors, setErrors] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, type1, type2, level } = formData;
    const newErrors = [];

    // Validate name
    if (!/^[A-Za-z]+$/.test(name)) {
      newErrors.push("Name must contain only alphabetic characters.");
    }
    if (name.length === 0) {
      newErrors.push("Name cannot be empty.");
    }

    // Validate type1
    if (!/^\d+$/.test(type1)) {
      newErrors.push("Type1 must be an integer.");
    }

    // Validate type2 (optional)
    if (type2 && !/^\d+$/.test(type2)) {
      newErrors.push("Type2 must be an integer.");
    }

    // Validate level
    const levelInt = parseInt(level, 10);
    if (isNaN(levelInt) || levelInt < 1 || levelInt > 100) {
      newErrors.push("Level must be an integer between 1 and 100.");
    }

    return newErrors;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const body = { ...formData };
      if (body.type2 === "") {
        body.type2 = null;
      }
      const response = await fetch("http://localhost:3000/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log("Pokemon inserted successfully");
        setFormData({
          name: "",
          type1: "",
          type2: "",
          level: "",
        });
      } else {
        console.error("Failed to insert Pokemon");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Type1:</label>
          <input
            type="text"
            name="type1"
            value={formData.type1}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Type2:</label>
          <input
            type="text"
            name="type2"
            value={formData.type2}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Level:</label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {errors.length > 0 && (
        <div id="error-messages">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <PokemonList></PokemonList>
    </>
  );
}
