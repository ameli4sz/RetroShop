import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/dashboard/ProductsList";
import ProductStatusCharts from "../components/dashboard/ProductcStats";
import DashboardButtons from "../components/dashboard/DashboardButtons";
import useProductStore from "../store/productStore";
import { motion } from "framer-motion";


import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const { logout } = useAuthContext();

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
    logout();
    navigate("/"); 
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Witaj w panelu RetroShop</h1>

      <DashboardButtons />
      <div className="dashboard-button">
        <button onClick={handleLogout}>Wyloguj się</button> {}
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
