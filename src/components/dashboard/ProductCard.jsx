import React from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
  const imageSrc = product.image
    ? product.image
    : "https://via.placeholder.com/250x150?text=Brak+zdjęcia";

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={product.name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
          border: "1px solid #ddd",
        }}
      />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">Opis: {product.description}</p>
      <p className="product-price">Cena: {product.price} zł</p>
      <p className="product-price">Dostępność: {product.status}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(product.id)}>Edytuj</button>
        <button
          onClick={() => onDelete(product.id)}
          style={{ backgroundColor: "#ff4d4d" }}
        >
          Usuń
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
