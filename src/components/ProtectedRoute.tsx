import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function ProtectedRoute() {
  console.log("protected route")
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="p-4 overflow-x-hidden min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
