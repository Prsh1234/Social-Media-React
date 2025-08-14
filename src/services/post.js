import axios from "axios";
import CONFIG from "../config";

export const doPost = async (post) => {
  try {
    const res = await axios.post(`${CONFIG.API_URL}/post/contentpost`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Optionally return the saved post from the backend
    return { success: true, data: res.data };
  } catch (error) {
    // More descriptive error handling
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Post failed";
    return { success: false, error: message };
  }
};

export const doGetUserPosts = async (userId) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/post/byuser`, {
      params: { posterId: userId }, // <-- send posterId as query param
    });
    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to fetch posts";
    return { success: false, error: message };
  }
};
