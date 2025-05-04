import { useState } from "react";
import axios from '../api/axios'; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      alert("Login Successful");
      navigate("/"); // Redirect to home
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} style={{ border: "3px solid #f1f1f1", padding: "20px" }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label"><b>Username</b></label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label"><b>Password</b></label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Login</button>

        <div className="mt-3 text-end">
          <a href="/register/">Register as new user?</a>
        </div>
      </form>
    </div>
  );
}
