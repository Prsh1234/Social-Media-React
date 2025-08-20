import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../../services/auth";
import Header from "../Header";
import ProfileHeader from "./ProfileHeader";
import ProfileNav from "./ProfileNav";
import Sidebar from "../Sidebar";


const ProfileLayout = () => {
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
          <ProfileHeader />
          <ProfileNav />
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ProfileLayout;
