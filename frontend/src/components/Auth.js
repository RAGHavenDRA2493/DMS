import React, { useState } from "react";
import API from "../api";

function Auth() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const dataToSend = isLogin ? { email: formData.email, password: formData.password } : formData;
      const { data } = await API.post(endpoint, dataToSend);
      localStorage.setItem("token", data.token);
      alert("Authentication successful!");
      window.location.href = "/upload"; // Redirect to upload page
    } catch (err) {
      if (err.response) {
        console.error("Server error:", err.response.data);
        alert(err.response.data.message || "Authentication failed. Please check your details.");
      } else if (err.request) {
        console.error("Network error:", err.request);
        alert("Network Error. Please check your internet connection.");
      } else {
        console.error("Error:", err.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* Only show the name field for signup */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}

export default Auth;