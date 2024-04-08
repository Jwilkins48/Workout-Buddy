import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    // logout hook
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
