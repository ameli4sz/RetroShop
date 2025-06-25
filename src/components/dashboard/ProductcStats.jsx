import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProductStats = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd przy pobieraniu danych:", err);
        setLoading(false);
      });
  }, []);

  const statusCounts = {
    Dostępny: 0,
    Zarezerwowany: 0,
    Sprzedany: 0,
  };

  products.forEach((product) => {
    const status = product.status;
    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    }
  });

  const data = {
    labels: ["Dostępny", "Zarezerwowany", "Sprzedany"],
    datasets: [
      {
        label: "Liczba produktów",
        data: [
          statusCounts["Dostępny"],
          statusCounts["Zarezerwowany"],
          statusCounts["Sprzedany"],
        ],
        backgroundColor: ["#993366", "#cc3366", "#ff3366"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.raw} szt.` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (loading) return <p>Ładowanie danych...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Status produktów</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductStats;
