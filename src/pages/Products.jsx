import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/dashboard/ProductsList";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania produktów");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Błąd usuwania produktu:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <p>Ładowanie produktów...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div>
      <h1>Lista produktów</h1>
      <button onClick={() => navigate("/add-product")}>Dodaj nowy produkt</button>
      <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} />
      <button onClick={goToDashboard}>Przejdź do Dashboard</button>
    </div>
  );
};

export default Products;
