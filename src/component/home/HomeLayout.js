import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import FriendBar from "../../pages/home/FriendBar";
import { validateAuthToken } from "../../services/auth";
import Header from "../Header";
import Sidebar from "../Sidebar";

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
      <div className="home-main-wrapper" style={{ marginRight: "280px" }} >

        <Sidebar />
        <div className="home-main-content">
          <Outlet />
        </div>
        <FriendBar />
      </div>
    </div>

  )
}
export default HomeLayout;