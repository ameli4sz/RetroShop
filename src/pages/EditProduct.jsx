import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EditProductForm from "../components/products/EditProductForm";
import useProductStore from "../store/productStore";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) throw new Error("Nie udało się pobrać produktu");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const updateLocalProduct = useProductStore((state) => state.fetchProducts); // pobieramy z API i aktualizujemy store

  const handleSubmit = async (updatedProduct) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      await updateLocalProduct(); // aktualizacja store po edycji
      navigate("/products");
    } catch (err) {
      console.error("Błąd zapisu:", err);
      alert("Coś poszło nie tak podczas zapisu produktu");
    }
  };

  if (loading) return <p>Ładowanie produktu...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <motion.div
      className="edit-product-form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Edytuj produkt</h2>
      <EditProductForm initialProduct={product} onSubmit={handleSubmit} />
    </motion.div>
  );
};

export default EditProduct;
