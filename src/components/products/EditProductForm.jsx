import React, { useState, useEffect, useRef } from "react";

const EditProductForm = ({ initialProduct, onSubmit }) => {
  const [name, setName] = useState(initialProduct?.name || "");
  const [description, setDescription] = useState(
    initialProduct?.description || ""
  );
  const [price, setPrice] = useState(initialProduct?.price || "");
  const [status, setStatus] = useState(initialProduct?.status || "Dostępny");
  const [image, setImage] = useState(initialProduct?.image || "");

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Aktualizuj stan, gdy initialProduct się zmieni (np. po fetchu)
  useEffect(() => {
    setName(initialProduct?.name || "");
    setDescription(initialProduct?.description || "");
    setPrice(initialProduct?.price || "");
    setStatus(initialProduct?.status || "Dostępny");
    setImage(initialProduct?.image || "");
  }, [initialProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      price: parseFloat(price),
      status,
      image,
    });
  };

  return (
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
  );
};

export default EditProductForm;
