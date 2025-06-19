import React, { useState } from "react";

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "Dostępny",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
    };
    onSubmit(productData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <input
        name="name"
        placeholder="Nazwa"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Opis"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Cena"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Dostępny</option>
        <option>Zarezerwowany</option>
        <option>Sprzedany</option>
      </select>
      <input
        name="image"
        placeholder="URL obrazka"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit">Dodaj produkt</button>
    </form>
  );
};

export default ProductForm;
