import React, { useState, useReducer, useMemo } from "react";
import ProductCard from "./ProductCard";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return "Wszystkie";
    case "DOSTEPNE":
      return "Dostępny";
    case "ZAREZERWOWANE":
      return "Zarezerwowany";
    case "SPRZEDANE":
      return "Sprzedany";
    default:
      return state;
  }
};

const ProductList = ({
  products = [],
  onDelete,
  onEdit,
  showFilterButtons = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, dispatchFilter] = useReducer(filterReducer, "Wszystkie");

  const filteredAndSorted = useMemo(() => {
    let filtered = [...products];

    // Filtrowanie po statusie
    if (showFilterButtons && filterStatus !== "Wszystkie") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    // Szukanie po nazwie
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sortowanie po cenie
    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return filtered;
  }, [products, searchTerm, sortOrder, filterStatus, showFilterButtons]);

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
        <div className="sort-button">
          <button onClick={() => setSortOrder("asc")}>Cena rosnąco</button>
          <button onClick={() => setSortOrder("desc")}>Cena malejąco</button>
        </div>
      </div>

      {showFilterButtons && (
        <div className="filter-buttons" style={{ marginBottom: "10px" }}>
          <button onClick={() => dispatchFilter({ type: "ALL" })}>
            Wszystkie
          </button>
          <button onClick={() => dispatchFilter({ type: "DOSTEPNE" })}>
            Dostępne
          </button>
          <button onClick={() => dispatchFilter({ type: "ZAREZERWOWANE" })}>
            Zarezerwowane
          </button>
          <button onClick={() => dispatchFilter({ type: "SPRZEDANE" })}>
            Sprzedane
          </button>
        </div>
      )}

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
