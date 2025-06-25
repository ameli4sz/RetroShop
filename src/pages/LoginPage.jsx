import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginpage/LoginForm";
import { motion } from "framer-motion"; // ✅ animacja

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </motion.div>
  );
};

export default LoginPage;
