import axios from "axios";
import CONFIG from "../config";
export const AUTH_TOKEN="516fb57b-f2c5-4985-95e1-e3e4836d8bd4";


export const doLogin = async (email, password) => {
    try {
        const res = await axios.post(`${CONFIG.API_URL}/auth/login`, { email, password });
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        return true;
    } catch (error) {
        return { error: error.response?.data?.error || 'Login failed' };
    }
};

export const validateAuthToken = async (navigate) => {
    const authToken = localStorage.getItem("AUTH_TOKEN");
  
    if (!authToken) {
      navigate("login");
      return false;
    }
  
    try {
      await axios.get(`${CONFIG.API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      return true; // token valid
    } catch (error) {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/login");
      return false;
    }
  };
