import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../../services/auth";
import FriendHeader from "./FriendHeader";
import FriendNav from "./FriendNav";
import Header from "../Header";
import Sidebar from "../Sidebar";


const FriendLayout = () => {
  const navigate = useNavigate();

  // Validate auth on mount
  useEffect(() => {
    validateAuthToken(navigate);
  }, [navigate]);

  return (


    <div className="home-container">
      <div className="home-header">
        <Header />
      </div>
      <div className="home-main-wrapper">
        <Sidebar />
        <div className="home-main-content">
          <FriendHeader />
          <FriendNav />
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default FriendLayout;
