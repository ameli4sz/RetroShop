import React from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Cena: {product.price} zł</p>
      <button onClick={() => onEdit(product.id)} tyle={{ ...styles.btn, backgroundColor: "pink" }}>Edytuj</button>
      <button onClick={() => onDelete(product.id)} style={{ ...styles.btn, backgroundColor: "red" }}>Usuń</button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "200px",
  },
  btn: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default ProductCard;
