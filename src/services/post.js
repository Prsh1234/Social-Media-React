import axios from "axios";
import CONFIG from "../config";

export const doPost = async (post, isFormData = false) => {
  try {
    const res = await axios.post(
      `${CONFIG.API_URL}/post/contentpost`,
      post,
      {
        headers: isFormData
          ? {} : { "Content-Type": "application/json" }
      }
    );

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Post failed";
    return { success: false, error: message };
  }
};


export const doGetUserPosts = async (userId) => {
  const posterId = userId;
  try {
    const res = await axios.get(`${CONFIG.API_URL}/post/byuser`, {
      params: { posterId: posterId }, // <-- send posterId as query param
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


export const doGetTimelinePosts = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`${CONFIG.API_URL}/post/timelineposts?userId=${userId}`);
    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to fetch posts";
    return { success: false, error: message };
  }
};

export const deletePost = async (postId) => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.delete(`${CONFIG.API_URL}/post/deletepost?postId=${postId}&userId=${userId}`); 
    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to delete post";
    return { success: false, error: message };
  }
};