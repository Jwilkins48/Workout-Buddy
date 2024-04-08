import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
