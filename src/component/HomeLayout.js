import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { validateAuthToken } from "../services/auth";
import Header from "./Header";
import Sidebar from "./Sidebar";

const HomeLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    validateAuthToken(navigate);
  }, [navigate]);


  return (
    <div className="container">
      <Header />
      <div className="row main-wrapper">
        <Sidebar />
        <div className="col main-body">
          <Outlet />
        </div>
      </div>
    </div>

  )
}
export default HomeLayout;