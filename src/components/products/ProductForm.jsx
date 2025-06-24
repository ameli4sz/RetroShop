import React, { useState, forwardRef, useImperativeHandle } from "react";

const ProductForm = forwardRef(({ onSubmit }, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "Dostępny",
    image: "",
  });

  useImperativeHandle(ref, () => ({
    reset() {
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "Dostępny",
        image: "",
      });
    },
  }));

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
    <div className="add-product-form">
      <h2>Dodaj produkt</h2>
    <form onSubmit={handleSubmit} >
       <label htmlFor="name">Nazwa:</label>
      <input
        name="name"
        placeholder="Nazwa"
        value={formData.name}
        onChange={handleChange}
        required
      />

       <label htmlFor="description">Opis:</label>
      <textarea
        name="description"
        placeholder="Opis"
        value={formData.description}
        onChange={handleChange}
        required
      />

       <label htmlFor="price">Cena:</label>
      <input
        name="price"
        type="number"
        placeholder="Cena"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="status">Dostępność:</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="">Wybierz</option>
        <option value="Dostępny">Dostępny</option>
        <option value="Zarezerwowany">Zarezerwowany</option>
        <option value="Sprzedany">Sprzedany</option>
      </select>

      <label htmlFor="image">URL obrazka:</label>
      <input
        name="image"
        placeholder="URL obrazka"
        value={formData.image}
        onChange={handleChange}
      />

       {formData.image && (
          <img
            src={formData.image}
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

      <button type="submit">Dodaj produkt</button>
    </form>
    </div>
  );
});

export default ProductForm;
