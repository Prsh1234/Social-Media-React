import axios from "axios";
import CONFIG from "../config";




export const registerUser = async (newUser) => {
  try {
    const response = await axios.post(`${CONFIG.API_URL}/register`, newUser);
    console.log("Registering user:", newUser);
    return response.data; // { success: true/false, message: "..." }
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: "Server error" };
  }
};
