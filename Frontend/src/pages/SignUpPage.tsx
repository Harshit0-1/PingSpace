import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../helper/constant";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post(`${baseUrl}/signup`, {
        username,
        password,
      });

      console.log("Signup success:", data);

      navigate("/");
    } catch (err: any) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        // Axios error handling
        setError(err.response?.data?.detail || "Failed to create account");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="brand">PingSpace</h1>
        <h2>Create account</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Name
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="primary-btn">
            Sign up
          </button>
        </form>

        <div className="muted">
          Have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}
