import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./styles/Signupstyle.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setSuccess("✅ Account created successfully! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link-text">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
