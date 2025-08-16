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

export const getAllUsers = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${CONFIG.API_URL}/user/allusers?currentUserId=${userId}`);
    return {
      success: true,
      data: response.data, // assuming response.data is an array of users
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

export const getUserData = async (userId) => {
  try {
    console.log(userId);
    const response = await axios.get(`${CONFIG.API_URL}/user/userdata?currentUserId=${userId}`);
    return {
      success: true,
      data: response.data, // assuming response.data is an array of users
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

export const updateProfile = async (userData) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.put(`${CONFIG.API_URL}/user/updateProfile?currentUserId=${userId}`, userData);
    return {
      success: true,
      data: response.data, // assuming response.data is an array of users
    };
  } catch (error) {
    console.error("Error saving users:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.put(
      `${CONFIG.API_URL}/user/changePassword?currentUserId=${userId}`,
      { currentPassword, newPassword }
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, error: error.response?.data || "Server error" };
  }
};

export const doUpload = async (file, type, userId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type); // "profile" or "cover"
    formData.append("userId", userId);

    const res = await axios.post(
      `${CONFIG.API_URL}/user/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Upload failed";
    return { success: false, error: message };
  }
};