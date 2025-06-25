import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/dashboard/ProductsList";
import ProductStatusCharts from "../components/dashboard/ProductcStats";
import DashboardButtons from "../components/dashboard/DashboardButtons";
import useAuth from "../hooks/useAuth";
import useProductStore from "../store/productStore"; // ⬅️ zmień ścieżkę jeśli inna
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();

  useAuth();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const availableProducts = products.filter(
    (product) => product.status === "Dostępny"
  );

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Witaj w panelu RetroShop </h1>

      <DashboardButtons />
      <div className="dashboard-button">
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
      <ProductStatusCharts />
      <ProductList
        products={availableProducts}
        onDelete={() => {}}
        onEdit={handleEdit}
        showFilterButtons={false}
      />
    </motion.div>
  );
};

export default Dashboard;
