import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/dashboard/ProductsList";
import ProductStats from "../components/dashboard/ProductcStats";
import DashboardButtons from "../components/dashboard/DashboardButtons";


const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci");
        return res.json();
      })
      .then((data) => {
        const availableProducts = data.filter(
          (product) => product.available === true
        );
        setProducts(availableProducts);
      })
      .catch((err) => {
        console.error("Błąd pobierania produktów:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>Witaj w panelu RetroShop </h1>

      <DashboardButtons />
      <ProductStats />
      <ProductList
        products={products}
        onDelete={() => {}}
        onEdit={handleEdit}
      />

      <button onClick={handleLogout} className="dashboard-button-logout">
        Wyloguj się
      </button>
    </div>
  );
};

export default Dashboard;
