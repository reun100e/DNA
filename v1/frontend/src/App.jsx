import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="fx-circle-1"></div>
      <div className="fx-circle-2"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute setIsLoggedIn={setIsLoggedIn}>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
