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
    <div className="container">
      <div className="sort-buttons">
        <input
          type="text"
          placeholder="Szukaj po nazwie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={() => setSortOrder("asc")}>Cena rosnąco</button>
        <button onClick={() => setSortOrder("desc")}>Cena malejąco</button>
      </div>

      <div className="products-grid">
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

export default ProductList;

