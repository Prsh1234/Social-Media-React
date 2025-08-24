import axios from "axios";
import CONFIG from "../config";



export const registerUser = async (newUser) => {
  try {
    const response = await axios.post(`${CONFIG.API_URL}/auth/register`, newUser);
    if(response.data.success) {
      return response.data; // { success: true/false, message: "..." }
    }
    else{
      console.error("Registration failed:", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("AUTH_TOKEN");

    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${CONFIG.API_URL}/user/allusers?currentUserId=${userId}`,
    {
        headers: { Authorization: `Bearer ${token}` }
    });
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
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const response = await axios.get(`${CONFIG.API_URL}/user/userdata?currentUserId=${userId}`,
    {
        headers: { Authorization: `Bearer ${token}` }
    });
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
    const token = localStorage.getItem("AUTH_TOKEN");

    const response = await axios.put(
      `${CONFIG.API_URL}/user/updateProfile?currentUserId=${userId}`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` } // include token
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error saving users:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("AUTH_TOKEN");

    const response = await axios.put(
      `${CONFIG.API_URL}/user/changePassword?currentUserId=${userId}`,
      { currentPassword, newPassword }, // body
      { headers: { Authorization: `Bearer ${token}` } } // headers
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error changing password:", error);
    const errorMessage =
      error.response?.data?.error || // backend sends { error: "Incorrect Password" }
      error.response?.data || // backend sends "User not found"
      "Server error";

    return { success: false, error: errorMessage };
  }
};


export const doUpload = async (file, type, userId) => {
  try {
    const token = localStorage.getItem("AUTH_TOKEN");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("userId", userId);

    const res = await axios.post(
      `${CONFIG.API_URL}/user/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` // include token
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

export const doDeleteAccount = async (id) => {
  try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const response = await axios.delete(
          `${CONFIG.API_URL}/user/deleteuser/${id}`,
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );

      return {
          success: response.data.success || false,
          data: response.data,
          message: response.data.message || "",
      };
  } catch (error) {
      console.error("Error deleting user:", error);
      return {
          success: false,
          message: error.response?.data?.message || error.message || "Unknown error",
      };
  }
};
