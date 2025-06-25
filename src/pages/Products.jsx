import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/dashboard/ProductsList";
import { motion } from "framer-motion";
import useProductStore from "../store/productStore";

const Products = () => {
  const navigate = useNavigate();

  const { products, loading, error, fetchProducts, deleteProduct } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <p>Ładowanie produktów...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <motion.div
      className="product-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Lista wszystkich produktów</h1>
      <div className="product-button">
        <button onClick={() => navigate("/add-product")}>
          Dodaj nowy produkt
        </button>
      </div>
      <div className="product-button">
        <button onClick={goToDashboard}>Przejdź do Dashboard</button>
      </div>
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </motion.div>
  );
};

export default Products;
