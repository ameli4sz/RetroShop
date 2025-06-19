import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginpage/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
