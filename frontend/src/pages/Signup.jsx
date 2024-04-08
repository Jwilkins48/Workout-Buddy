import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
      />

      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
