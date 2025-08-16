import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../services/auth";
import Header from "./Header";
import ProfileHeader from "./ProfileHeader";

const ProfileLayout = () => {
  const navigate = useNavigate();

  // Validate auth on mount
  useEffect(() => {
    validateAuthToken(navigate);
  }, [navigate]);

  return (
    <div className="container">
      <Header />
      <ProfileHeader />

      <div className="row main-wrapper">
        <div className="col main-body main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
