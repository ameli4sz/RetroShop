import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";


const AddProduct = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleAddProduct = useCallback((newProduct) => {
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
        if (formRef.current) {
          formRef.current.reset(); // zresetuj formularz (jeśli ref przekazany do <form>)
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }
        navigate("/products");
      })
      .catch((err) => {
        console.error("Błąd dodawania produktu:", err);
        alert("Wystąpił błąd podczas dodawania produktu.");
      });
  }, [navigate]);

  return (
    <div className="add-product-page">
      <h2 className="add-product-title">Dodaj nowy produkt</h2>
      <ProductForm onSubmit={handleAddProduct} formRef={formRef} />
    </div>
  );
};

export default AddProduct;
