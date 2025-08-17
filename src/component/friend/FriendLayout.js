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
    <div className="container">
      <div className="row profile-header-wrapper">
        <Header />
        <FriendHeader />
      </div>
      <div className="row main-wrapper">
        <Sidebar />

        <div className="col main-body main-content">
          <FriendNav />
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default FriendLayout;
