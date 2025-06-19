import { useNavigate } from "react-router-dom";

const DashboardButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/products")}>
        📋 Zobacz wszystkie produkty
      </button>
    </div>
  );
};

export default DashboardButtons;
