import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import withAuthProtection from "./hoc/withAuthProtection";

const ProtectedDashboard = withAuthProtection(Dashboard);
const ProtectedProducts = withAuthProtection(Products);
const ProtectedAddProduct = withAuthProtection(AddProduct);
const ProtectedEditProduct = withAuthProtection(EditProduct);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/products" element={<ProtectedProducts />} />
        <Route path="/add-product" element={<ProtectedAddProduct />} />
        <Route path="/edit/:id" element={<ProtectedEditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
