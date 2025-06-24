import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Dostępny");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setStatus(data.status || "Dostępny");
        setImage(data.image || "");
      })
      .catch((err) => console.error("Błąd podczas pobierania produktu:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      status,
      image
    };

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
      .then(() => navigate("/products"))
      .catch((err) => console.error("Błąd podczas zapisu produktu:", err));
  };

  return (
    <div className="edit-product-form">
      <h2>Edytuj produkt</h2>
      <form onSubmit={handleSubmit}>

        <label>Nazwa:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Opis:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Cena:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Dostępność:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Wybierz</option>
          <option value="Dostępny">Dostępny</option>
          <option value="Niedostępny">Niedostępny</option>
          <option value="Zarezerwowany">Zarezerwowany</option>
        </select>

        <label>URL obrazka:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default EditProduct;
