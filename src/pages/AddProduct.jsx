import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import { motion } from "framer-motion";
import useProductStore from "../store/productStore"; 

const AddProduct = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const addProduct = useProductStore((state) => state.addProduct);

  const handleAddProduct = useCallback(
    async (newProduct) => {
      try {
        const res = await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        if (!res.ok) throw new Error("Nie udało się dodać produktu");
        const savedProduct = await res.json();
        addProduct(savedProduct); 
        if (formRef.current) {
          formRef.current.reset();
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }
        navigate("/products");
      } catch (err) {
        console.error("Błąd dodawania produktu:", err);
        alert("Wystąpił błąd podczas dodawania produktu.");
      }
    },
    [navigate, addProduct]
  );

  return (
    <motion.div
      className="add-product-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="add-product-title">Dodaj nowy produkt</h2>
      <ProductForm onSubmit={handleAddProduct} formRef={formRef} />
    </motion.div>
  );
};

export default AddProduct;
