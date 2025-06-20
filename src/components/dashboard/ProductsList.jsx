import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSorted = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Szukaj po nazwie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => setSortOrder("asc")} style={styles.button}>
          Cena rosnąco
        </button>
        <button onClick={() => setSortOrder("desc")} style={styles.button}>
          Cena malejąco
        </button>
      </div>

      <div style={styles.list}>
        {filteredAndSorted.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  controls: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    flex: "1",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default ProductList;
