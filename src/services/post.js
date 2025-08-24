import axios from "axios";
import CONFIG from "../config";
export const doPost = async (post, isFormData = false) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.post(
      `${CONFIG.API_URL}/post/contentpost`,
      post,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
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


export const doGetUserPosts = async (userId, page = 0, size = 5 ) => {
  const posterId = userId;
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.get(`${CONFIG.API_URL}/post/byuser`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { posterId: posterId, page, size }, // <-- send posterId as query param
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


export const doGetTimelinePosts = async (page = 0, size = 5) => {
  try {
    const token = localStorage.getItem("AUTH_TOKEN");

    const userId = localStorage.getItem("userId");
    const res = await axios.get(
      `${CONFIG.API_URL}/post/timelineposts`,
      {
        params: { userId, page, size },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
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
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.delete(`${CONFIG.API_URL}/post/deletepost?postId=${postId}&userId=${userId}`,
    {
        headers: { Authorization: `Bearer ${token}` }
    }); 
    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to delete post";
    return { success: false, error: message };
  }
};



export const toggleLike = async (postId, userId) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res = await axios.post(`${CONFIG.API_URL}/post/like`, null, {
      headers: { Authorization: `Bearer ${token}` },
      params: { postId, userId }
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};