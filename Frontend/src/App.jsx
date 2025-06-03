import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./api/User.api.js";
import { logout } from "./store/slice/authSlice"; // ✅ ADD THIS IMPORT
import { useNavigate } from "@tanstack/react-router";


function RootLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logoutUser(); // optional: clears session/token on backend
      dispatch(logout()); // ✅ clears Redux state
      navigate({to:'/'})
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar
        isLoggedIn={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <Outlet />
    </>
  );
}

export default RootLayout;
