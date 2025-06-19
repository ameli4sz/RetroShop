import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      {product.image && (
        <img src={product.image} alt={product.name} style={styles.image} />
      )}
      <h3 style={styles.name}>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Cena:</strong> {product.price} zł
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: statusColor(product.status) }}>
          {product.status}
        </span>
      </p>
    </div>
  );
};

const statusColor = (status) => {
  switch (status) {
    case "Sprzedany":
      return "red";
    case "Zarezerwowany":
      return "orange";
    case "Dostępny":
      return "green";
    default:
      return "black";
  }
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "16px",
    width: "250px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  name: {
    margin: "0 0 8px 0",
  },
};

export default ProductCard;
