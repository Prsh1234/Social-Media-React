import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../services/auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Users from "./Users";

const HomeLayout = () => {
  const navigate = useNavigate();
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
          <Outlet />
        </div>
        <div className="home-right-sidebar">
          <Users />
        </div>
      </div>
    </div>

  )
}
export default HomeLayout;