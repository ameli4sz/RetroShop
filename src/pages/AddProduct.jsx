import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleAddProduct = (newProduct) => {
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nie udało się dodać produktu");
        return res.json();
      })
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error("Błąd dodawania produktu:", err);
        alert("Wystąpił błąd.");
      });
  };

  return (
    <div>
      <h2>Dodaj nowy produkt</h2>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProduct;
