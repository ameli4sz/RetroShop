import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Dostępny");
  const [image, setImage] = useState("");

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const updatedProduct = {
        name,
        description,
        price: parseFloat(price),
        status,
        image,
      };

      fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then(() => navigate("/products"))
        .catch((err) => console.error("Błąd podczas zapisu produktu:", err));
    },
    [id, name, description, price, status, image, navigate]
  );

  return (
    <div className="edit-product-form">
      <h2>Edytuj produkt</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nazwa:</label>
        <input
          id="name"
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="price">Cena:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="status">Dostępność:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Wybierz</option>
          <option value="Dostępny">Dostępny</option>
          <option value="Zarezerwowany">Zarezerwowany</option>
          <option value="Sprzedany">Sprzedany</option>
        </select>

        <label htmlFor="image">URL obrazka:</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {image && (
          <img
            src={image}
            alt="Podgląd"
            style={{
              marginTop: "10px",
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "contain",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        )}

        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default EditProduct;
