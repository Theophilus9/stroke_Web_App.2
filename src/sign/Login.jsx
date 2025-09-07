import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 
import { useNavigate } from "react-router-dom";
import './styles/Loginstyle.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
  <label>Password</label>
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <img
      src={showPassword ? "/static/show.png" : "/static/hidden.png"}
      alt="Toggle Password"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    />
  </div>
</div>


          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="signup-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link-text">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
