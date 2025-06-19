import React, { useState } from "react";
import { validUsers } from "../../mocks/Login";
const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userIsValid = validUsers.some(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (userIsValid) {
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess();
    } else {
      alert("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Panel pracownika</h2>

      <div className="input-group">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="input-label">
          Hasło
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <button type="submit" className="submit-button">
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
