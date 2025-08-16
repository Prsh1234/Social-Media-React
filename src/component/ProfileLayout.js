import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../services/auth";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";
import Nav from "./ProfileNav";
import Sidebar from "./Sidebar";


const ProfileLayout = () => {
  const navigate = useNavigate();

  // Validate auth on mount
  useEffect(() => {
    validateAuthToken(navigate);
  }, [navigate]);

  return (
    <div className="container">
      <div className="row profile-header-wrapper">
        <Header />
        <ProfileHeader />
      </div>
      <div className="row main-wrapper">
        <Sidebar />

        <div className="col main-body main-content">
          <Nav />
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default ProfileLayout;
