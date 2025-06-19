import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [] }) => {
  return (
    <div style={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};

export default ProductList;
